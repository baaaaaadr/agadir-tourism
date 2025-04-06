<script>
    import { browser } from '$app/environment';
    import { onMount, onDestroy, afterUpdate } from 'svelte';

    // Props reçues du parent
    export let center = [30.4202, -9.5982]; // Centre par défaut Agadir
    export let zoom = 13;
    export let markers = []; // Tableau de {lat, lon, popupText, id?, type?}
    export let mapId = 'leaflet-map'; // ID unique pour le conteneur div

    let mapContainerElement; // Référence à l'élément div du DOM
    let mapInstance = null; // Instance de la carte Leaflet
    let L = null; // Variable pour contenir la librairie Leaflet chargée dynamiquement
    let markerLayerGroup = null; // Groupe pour gérer les marqueurs

    // Indicateur pour savoir si Leaflet est chargé
    let leafletLoaded = false;

    onMount(async () => {
        // N'exécute ce code que dans le navigateur
        if (browser) {
            try {
                // Importe Leaflet dynamiquement côté client UNIQUEMENT
                const leafletModule = await import('leaflet');
                L = leafletModule.default || leafletModule; // Utilise .default si ça existe, sinon le module direct
                leafletLoaded = true; // Indique que Leaflet est prêt

                // Initialise la carte une fois Leaflet chargé et le DOM prêt
                if (mapContainerElement && !mapInstance) {
                    initializeMap();
                }
            } catch (e) {
                console.error("Erreur lors du chargement de Leaflet:", e);
            }
        }
    });

    function initializeMap() {
         console.log(`Initialisation de la carte: ${mapId}`);
        // Crée la carte et la lie à notre div
        mapInstance = L.map(mapContainerElement).setView(center, zoom);

        // Ajoute la couche de tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        // Crée un groupe pour les marqueurs pour les ajouter/supprimer facilement
        markerLayerGroup = L.layerGroup().addTo(mapInstance);

        // Ajoute les marqueurs initiaux si présents
        updateMapMarkers(markers);

         // S'assure que la taille de la carte est correcte (utile si elle était cachée)
        setTimeout(() => {
             if (mapInstance) mapInstance.invalidateSize();
         }, 100);
    }

    // Fonction pour mettre à jour les marqueurs sur la carte
    function updateMapMarkers(newMarkers) {
        if (!mapInstance || !markerLayerGroup || !L) return; // Ne rien faire si la carte n'est pas prête

         console.log(`Mise à jour des marqueurs pour ${mapId}:`, newMarkers.length);
        // Efface les anciens marqueurs
        markerLayerGroup.clearLayers();

        // Ajoute les nouveaux marqueurs
        newMarkers.forEach(markerInfo => {
            if (markerInfo.lat != null && markerInfo.lon != null) {
                const marker = L.marker([markerInfo.lat, markerInfo.lon]);

                // Ajoute un popup si du texte est fourni
                if (markerInfo.popupText) {
                    // Utilise bindPopup avec un petit délai pour éviter les problèmes de fermeture/ouverture rapide
                    marker.bindPopup(markerInfo.popupText, { closeButton: true, autoClose: false });
                }

                // Ajoute le marqueur au groupe
                marker.addTo(markerLayerGroup);
            }
        });

         // Optionnel: Ajuster la vue pour montrer tous les marqueurs (sauf si zoom/centre spécifique demandé)
        // if (newMarkers.length > 0 && markerLayerGroup.getBounds().isValid()) {
        //    mapInstance.fitBounds(markerLayerGroup.getBounds().pad(0.1));
        // }
    }

    // Réagit aux changements des props 'markers', 'center', 'zoom' APRES le rendu initial
    // Utilisation de afterUpdate pour s'assurer que l'élément DOM existe si les props changent très tôt
     let firstUpdate = true;
     afterUpdate(() => {
         if (mapInstance && leafletLoaded) { // Vérifie que Leaflet ET la map sont prêts
             // Met à jour les marqueurs si la prop 'markers' a changé
             // (Il faut une comparaison plus intelligente si 'markers' est un gros objet)
             // Pour l'instant, on met à jour à chaque rendu si nécessaire.
             updateMapMarkers(markers);

             // Met à jour le centre et le zoom si besoin (attention, peut entrer en conflit avec fitBounds)
             // mapInstance.setView(center, zoom);

             // Invalide la taille après la mise à jour initiale pour corriger les problèmes d'affichage
             if (firstUpdate) {
                  setTimeout(() => {
                     if (mapInstance) mapInstance.invalidateSize();
                 }, 100);
                 firstUpdate = false;
             }
         } else if (leafletLoaded && mapContainerElement && !mapInstance) {
             // Si Leaflet est chargé mais la map pas encore (cas rare), initialise
             initializeMap();
         }
     });


    onDestroy(() => {
        // Nettoie la carte quand le composant est détruit pour éviter les fuites mémoire
        if (mapInstance) {
            console.log(`Destruction de la carte: ${mapId}`);
            mapInstance.remove();
            mapInstance = null;
            markerLayerGroup = null;
        }
        leafletLoaded = false;
        L = null;
    });

</script>

<!-- Le conteneur où la carte sera injectée -->
<!-- Utilise bind:this pour obtenir une référence à cet élément DOM -->
<div bind:this={mapContainerElement} id={mapId} class="map-container-style">
    {#if !browser}
        <p>Chargement de la carte...</p> <!-- Message pendant le SSR -->
    {:else if !leafletLoaded}
         <p>Chargement de la librairie de carte...</p> <!-- Message pendant le chargement de Leaflet -->
    {/if}
    <!-- La carte Leaflet sera créée ici par le script -->
</div>

<style>
    .map-container-style {
        height: 400px; /* Hauteur par défaut pour la carte */
        width: 100%;
        background-color: #eee; /* Fond gris clair pendant le chargement */
        border-radius: 8px;
        border: 1px solid #ccc;
        margin-top: 1rem;
        box-shadow: 0 1px 5px rgba(0,0,0,0.1);
        position: relative; /* Nécessaire pour certains plugins Leaflet */
    }

    /* Style spécifique pour la carte principale vs détail si besoin */
    :global(#main-map.map-container-style) {
         height: 550px; /* Plus grande hauteur pour la carte principale */
    }

    .map-container-style p { /* Style pour les messages de chargement */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #666;
        font-style: italic;
    }

    /* Assure-toi que les popups Leaflet sont visibles */
    :global(.leaflet-popup-content-wrapper) {
      border-radius: 5px;
    }
    :global(.leaflet-popup-content) {
      font-size: 0.9rem;
      line-height: 1.4;
    }
     :global(.leaflet-popup-content a) {
       color: #0077cc;
       font-weight: bold;
     }
</style>