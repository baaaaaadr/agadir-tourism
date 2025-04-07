<script>
    import { browser } from '$app/environment';
    import { onMount, onDestroy, tick } from 'svelte'; // Ajout de tick

    // Props
    export let center = [30.4202, -9.5982];
    export let zoom = 13;
    export let markers = [];
    export let mapId = 'leaflet-map';

    // Références et état interne
    let mapContainerElement = null; // Référence à l'élément div
    let mapInstance = null;       // Instance de la carte Leaflet
    let L = null;                 // Référence à la librairie Leaflet (L majuscule)
    let markerLayerGroup = null;  // Groupe pour les marqueurs
    let isLoading = true;         // Pour afficher un message pendant l'import
    let errorLoading = null;      // Pour afficher une erreur

    // ----- Cycle de vie Svelte -----

    onMount(async () => {
        // Uniquement côté navigateur
        if (browser) {
            try {
                // Attend que le DOM soit prêt
                await tick();

                if (!mapContainerElement) {
                    console.error(`[${mapId}] Élément conteneur introuvable au montage.`);
                    errorLoading = "Erreur interne: Conteneur de carte non trouvé.";
                    isLoading = false;
                    return;
                }

                // Importe Leaflet dynamiquement
                console.log(`[${mapId}] Chargement dynamique de Leaflet...`);
                const leafletModule = await import('leaflet');
                console.log(`[${mapId}] Module Leaflet brut importé:`, leafletModule); // Log pour voir la structure

                // !! NOUVELLE STRATÉGIE D'ASSIGNATION !!
                L = leafletModule; // Essai 1: Assignation directe
                if (!L || typeof L.map !== 'function') {
                    console.log(`[${mapId}] L.map non trouvé sur module direct, essai avec .default...`);
                    L = leafletModule.default; // Essai 2: Assignation via .default
                }

                // !! VÉRIFICATION EXPLICITE !!
                if (!L || typeof L.map !== 'function') {
                    console.error(`[${mapId}] ERREUR: L.map n'est toujours pas une fonction après import.`, L);
                    throw new Error("La fonction L.map n'a pas été trouvée après l'import de Leaflet.");
                }

                console.log(`[${mapId}] Leaflet chargé et L.map trouvé.`);

                // Vérifie à nouveau si le composant existe toujours et la carte non créée
                if (mapContainerElement && !mapInstance) {
                     initializeMap();
                     isLoading = false; // Fin du chargement principal
                }

            } catch (e) {
                console.error(`[${mapId}] Erreur lors du chargement/initialisation de Leaflet:`, e);
                errorLoading = `Impossible de charger la librairie: ${e.message}`;
                isLoading = false;
            }
        } else {
            isLoading = false;
        }
    });

    onDestroy(() => {
        // Nettoie la carte proprement
        if (mapInstance) {
            console.log(`[${mapId}] Destruction de la carte.`);
            mapInstance.remove();
            mapInstance = null; // Important pour éviter réutilisation accidentelle
            markerLayerGroup = null;
            L = null; // Libère la référence
        }
    });

    // ----- Fonctions Leaflet -----

    function initializeMap() {
        if (!L || !mapContainerElement || mapInstance) return; // Sécurité supplémentaire

        console.log(`[${mapId}] Initialisation de la carte Leaflet.`);
        try {
            mapInstance = L.map(mapContainerElement).setView(center, zoom);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);

            markerLayerGroup = L.layerGroup().addTo(mapInstance);

            // Ajoute les marqueurs initiaux (ceux passés en prop au début)
            updateMapMarkers(markers);

            // Invalide la taille après un court délai pour s'assurer du bon rendu
            setTimeout(() => {
                if (mapInstance) {
                    mapInstance.invalidateSize();
                    console.log(`[${mapId}] invalidateSize() appelé.`);
                }
            }, 150); // Délai légèrement augmenté

        } catch (e) {
             console.error(`[${mapId}] Erreur pendant L.map() ou ajout de couches:`, e);
             errorLoading = `Erreur lors de la création de la carte: ${e.message}`;
             // Nettoie si l'initialisation a échoué à mi-chemin
             if (mapInstance) mapInstance.remove();
             mapInstance = null;
        }
    }

    function updateMapMarkers(newMarkers) {
        // Ne met à jour que si la carte et le groupe sont prêts
        if (!mapInstance || !markerLayerGroup || !L) {
             // console.log(`[${mapId}] updateMapMarkers annulé: carte non prête.`);
            return;
        }

        console.log(`[${mapId}] Mise à jour des marqueurs (${newMarkers?.length || 0}).`);
        markerLayerGroup.clearLayers(); // Efface les anciens

        (newMarkers || []).forEach(markerInfo => {
            if (markerInfo.lat != null && markerInfo.lon != null) {
                try {
                    const marker = L.marker([markerInfo.lat, markerInfo.lon]);
                    if (markerInfo.popupText) {
                        marker.bindPopup(markerInfo.popupText, { closeButton: true, autoClose: false });
                    }
                    marker.addTo(markerLayerGroup);
                } catch (e) {
                    console.error(`[${mapId}] Erreur lors de la création du marqueur: `, markerInfo, e);
                }
            }
        });
    }

    // ----- Réactivité Svelte -----

    // Réagit aux changements de la prop 'markers' SEULEMENT après initialisation
    $: if (mapInstance && L) {
        // Idéalement, il faudrait comparer l'ancien 'markers' et le nouveau
        // pour éviter des mises à jour inutiles si l'objet n'a pas changé.
        // Pour l'instant, on met à jour à chaque fois que 'markers' change.
        updateMapMarkers(markers);
        console.log(`[${mapId}] Détection changement markers prop.`);
    }

    // Réagit aux changements de 'center' et 'zoom' après initialisation
    $: if (mapInstance && L) {
         console.log(`[${mapId}] Détection changement center/zoom prop.`);
         // Attention: peut entrer en conflit avec fitBounds si utilisé
         // Dé-commenter seulement si vous gérez explicitement le centre/zoom par props
         // const currentCenter = mapInstance.getCenter();
         // const currentZoom = mapInstance.getZoom();
         // if (center && zoom && (currentCenter.lat !== center[0] || currentCenter.lng !== center[1] || currentZoom !== zoom)) {
         //    mapInstance.setView(center, zoom);
         // }
    }

</script>

<!-- Conteneur de la carte -->
<div bind:this={mapContainerElement} id={mapId} class="map-container-style" role="application" aria-label="Carte interactive">
    {#if !browser}
        <p>Carte interactive (chargement...)</p> <!-- Message SSR -->
    {:else if isLoading}
        <p>Chargement de la carte...</p> <!-- Message pendant import Leaflet -->
    {:else if errorLoading}
        <p class="map-error">Erreur: {errorLoading}</p> <!-- Message si erreur chargement/init -->
    {/if}
    <!-- La carte est injectée ici par Leaflet -->
</div>

<style>
    .map-container-style {
        height: 400px;
        width: 100%;
        background-color: #f0f0f0; /* Fond un peu plus foncé */
        border-radius: 8px;
        border: 1px solid #ccc;
        margin-top: 1rem;
        box-shadow: 0 1px 5px rgba(0,0,0,0.1);
        position: relative;
        overflow: hidden; /* Cache le contenu si Leaflet ne s'initialise pas */
    }

    /* Style pour la carte principale si besoin */
    :global(#main-map.map-container-style) {
         height: 500px; /* Hauteur carte principale */
    }
     /* Style pour la carte détail lieu/resto */
     :global(#detail-map.map-container-style) {
         height: 300px; /* Hauteur plus petite */
    }

    .map-container-style p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #555; /* Couleur plus visible */
        font-style: italic;
        text-align: center;
        padding: 0 1rem; /* Evite que texte long touche bords */
    }
     .map-error {
         color: #dc3545; /* Rouge erreur */
         font-weight: bold;
         font-style: normal;
     }

    /* Styles globaux pour Leaflet (à mettre idéalement dans app.css ou layout global) */
    /* Assure-toi que le CSS de Leaflet est bien chargé (via app.html ou import global) */
    :global(.leaflet-popup-content-wrapper) {
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.9); /* Léger fond transparent */
      box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    }
    :global(.leaflet-popup-content) {
      font-size: 0.9rem;
      line-height: 1.4;
      margin: 10px 15px; /* Ajuste padding interne popup */
      max-height: 200px; /* Limite hauteur popup */
      overflow-y: auto; /* Ajoute scroll si contenu trop long */
    }
     :global(.leaflet-popup-content p) {
       margin: 0.5em 0; /* Espacement paragraphes dans popup */
     }
     :global(.leaflet-popup-content a) {
       color: var(--primary-color, #007bff);
       font-weight: bold;
       text-decoration: none;
     }
      :global(.leaflet-popup-content a:hover) {
       text-decoration: underline;
     }
     :global(.leaflet-container a.leaflet-popup-close-button) {
         color: #555 !important; /* Couleur bouton fermeture */
         padding: 6px 6px 0 0 !important;
     }
</style>