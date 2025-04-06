/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// --- Configuration ---
const CACHE_PREFIX = 'agadir-pwa';
const CORE_CACHE_NAME = `${CACHE_PREFIX}-core-v${version}`; // Cache pour les fichiers de l'app (géré par Workbox)
const ASSETS_CACHE_NAME = `${CACHE_PREFIX}-assets-v1`;     // Cache pour les images locales, fontes...
const API_CACHE_NAME = `${CACHE_PREFIX}-api-v1`;          // Cache pour les réponses Supabase
const MAP_TILES_CACHE_NAME = `${CACHE_PREFIX}-map-tiles-v1`; // Cache pour les tuiles de carte

// --- Pré-cache des fichiers de l'application ---
// 'build' contient les fichiers générés par SvelteKit (JS, CSS chunks)
// 'files' contient les fichiers statiques (dans /static)
// 'prerendered' contient les routes pré-rendues (si activé)

// Fichiers à mettre en cache immédiatement lors de l'installation
// On ajoute explicitement les fichiers importants de /static qui ne sont pas automatiquement inclus par `files` parfois
const coreAssetsToCache = [
    ...build,
    ...files.filter(f => f.startsWith('/assets/') || f === '/manifest.json'), // Inclut nos assets et le manifest
    // Tu peux ajouter d'autres fichiers statiques importants ici si besoin
];

// Utilise Workbox pour gérer le pré-cache
precacheAndRoute(
    coreAssetsToCache.map(url => ({ url, revision: version })), // Associe une révision pour la mise à jour
    {
        cacheName: CORE_CACHE_NAME,
        // Ignore les paramètres d'URL pour le cache des fichiers de base
        ignoreURLParametersMatching: [/.*/]
    }
);


// --- Mise en cache des Ressources Locales (Images, Fontes...) ---
// Stratégie: Cache First - On sert depuis le cache si dispo, sinon réseau, puis on met en cache.
registerRoute(
    ({ request, url }) => request.destination === 'image' && url.origin === self.location.origin,
    new CacheFirst({
        cacheName: ASSETS_CACHE_NAME,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 100, // Garde les 100 dernières images
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
                purgeOnQuotaError: true, // Supprime ce cache si manque de place
            }),
        ],
    })
);
// Tu peux ajouter une règle similaire pour les fontes (request.destination === 'font')

// --- Mise en cache des Tuiles de Carte (OpenStreetMap) ---
// Stratégie: Stale While Revalidate - On sert depuis le cache (rapide), mais on met à jour en arrière-plan.
registerRoute(
    ({ url }) => url.origin === 'https://a.tile.openstreetmap.org' ||
                 url.origin === 'https://b.tile.openstreetmap.org' ||
                 url.origin === 'https://c.tile.openstreetmap.org',
    new StaleWhileRevalidate({
        cacheName: MAP_TILES_CACHE_NAME,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 500, // Garde un bon nombre de tuiles
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 jours
                 purgeOnQuotaError: true,
            }),
        ],
    })
);

// --- Mise en cache des Librairies externes (Leaflet CSS/JS depuis unpkg) ---
// Stratégie: Cache First - Ces fichiers ne changent pas souvent pour une version donnée.
registerRoute(
    ({ url }) => url.origin === 'https://unpkg.com',
    new CacheFirst({
        cacheName: `${CACHE_PREFIX}-external-libs-v1`,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 10, // Peu de fichiers externes
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
                 purgeOnQuotaError: true,
            }),
        ],
    })
);


// --- Mise en cache des Appels API (Supabase) ---
// Stratégie: Network First - On veut les données fraîches si possible, sinon on prend le cache.
registerRoute(
    ({ url }) => url.origin === new URL(import.meta.env.VITE_SUPABASE_URL).origin &&
                 url.pathname.startsWith('/rest/v1/'), // Cible les appels à l'API REST Supabase
    new NetworkFirst({
        cacheName: API_CACHE_NAME,
        networkTimeoutSeconds: 5, // Délai avant de tomber sur le cache (si réseau lent)
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50, // Garde les 50 dernières réponses API
                maxAgeSeconds: 1 * 24 * 60 * 60, // 1 jour (données peuvent changer)
            }),
        ],
    })
);


// --- Gestion du Cycle de Vie du Service Worker ---

// S'assure que le nouveau SW s'active dès qu'il est installé
self.addEventListener('install', (event) => {
    console.log('SW: Installation...');
    // Force le SW en attente à devenir le SW actif.
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('SW: Activation...');
    // Prend le contrôle des clients (onglets) immédiatement.
    event.waitUntil(self.clients.claim());

    // Nettoyage des anciens caches (ceux qui ne correspondent pas aux noms actuels)
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName.startsWith(CACHE_PREFIX) &&
                        cacheName !== CORE_CACHE_NAME &&
                        cacheName !== ASSETS_CACHE_NAME &&
                        cacheName !== API_CACHE_NAME &&
                        cacheName !== MAP_TILES_CACHE_NAME /* ajoute d'autres caches ici */ ) {
                        console.log('SW: Suppression ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
     console.log('SW: Prêt à gérer les fetchs.');
});

self.addEventListener('fetch', (event) => {
    // Laisse Workbox gérer les routes enregistrées
    // console.log('SW: Fetching', event.request.url);
});