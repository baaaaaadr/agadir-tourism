<script>
    import { browser } from '$app/environment';
    import { onMount, onDestroy, tick } from 'svelte';

    // Props
    export let center = [30.4202, -9.5982];
    export let zoom = 13;
    export let markers = [];
    export let mapId = 'leaflet-map';

    // Références et état interne
    let mapContainerElement = null;
    let mapInstance = null;
    let markerLayerGroup = null;
    // 'L' sera disponible globalement grâce au script dans app.html
    let L = null; // On le garde pour vérifier sa présence

    let isLoading = true; // Pour afficher message avant montage
    let errorLoading = null;

    onMount(async () => {
        if (browser) {
            // Attend que le DOM soit prêt ET que le script Leaflet (du CDN) ait potentiellement chargé L
            await tick();

            if (!mapContainerElement) {
                 console.error(`[${mapId}] Élément conteneur introuvable au montage.`);
                 errorLoading = "Erreur interne: Conteneur de carte non trouvé.";
                 isLoading = false;
                 return;
             }

            // Vérifie si l'objet global 'L' existe (chargé par le script CDN)
            if (typeof window.L === 'undefined' || window.L === null) {
                console.error(`[${mapId}] ERREUR: Objet global L non trouvé. Le script Leaflet du CDN n'a pas chargé?`);
                errorLoading = "Impossible de charger la librairie de carte (CDN).";
                isLoading = false;
                return;
            }

            L = window.L; // Assigne l'objet global L
             console.log(`[${mapId}] Objet global L trouvé.`);

             // Initialise si tout est prêt
            if (mapContainerElement && !mapInstance) {
                 initializeMap();
            }
            isLoading = false; // Fin du chargement

        } else {
            isLoading = false;
        }
    });

    onDestroy(() => {
        if (mapInstance) {
            console.log(`[${mapId}] Destruction de la carte.`);
            mapInstance.remove();
            mapInstance = null;
            markerLayerGroup = null;
            // Pas besoin de mettre L à null car il est global
        }
    });

    function initializeMap() {
        if (!L || !mapContainerElement || mapInstance) return;

        console.log(`[${mapId}] Initialisation de la carte Leaflet via CDN.`);
        try {
            mapInstance = L.map(mapContainerElement).setView(center, zoom);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);

            markerLayerGroup = L.layerGroup().addTo(mapInstance);
            updateMapMarkers(markers);

            setTimeout(() => {
                if (mapInstance) { mapInstance.invalidateSize(); }
            }, 150);

        } catch (e) {
             console.error(`[${mapId}] Erreur pendant L.map() ou ajout de couches (CDN):`, e);
             errorLoading = `Erreur lors de la création de la carte: ${e.message}`;
             if (mapInstance) mapInstance.remove();
             mapInstance = null;
        }
    }

    function updateMapMarkers(newMarkers) {
        if (!mapInstance || !markerLayerGroup || !L) return;

        // console.log(`[${mapId}] Mise à jour des marqueurs via CDN (${newMarkers?.length || 0}).`);
        markerLayerGroup.clearLayers();

        (newMarkers || []).forEach(markerInfo => {
            if (markerInfo.lat != null && markerInfo.lon != null) {
                try {
                    const marker = L.marker([markerInfo.lat, markerInfo.lon]);
                    if (markerInfo.popupText) {
                        marker.bindPopup(markerInfo.popupText, { closeButton: true, autoClose: false });
                    }
                    marker.addTo(markerLayerGroup);
                } catch (e) {
                    console.error(`[${mapId}] Erreur création marqueur (CDN): `, markerInfo, e);
                }
            }
        });
    }

    // Réactivité aux changements de props (reste pareil)
    $: if (mapInstance && L) {
        updateMapMarkers(markers);
    }
    $: if (mapInstance && L) {
        // const currentCenter = mapInstance.getCenter();
        // const currentZoom = mapInstance.getZoom();
        // if (center && zoom && (currentCenter.lat !== center[0] || currentCenter.lng !== center[1] || currentZoom !== zoom)) {
        //    mapInstance.setView(center, zoom);
        // }
    }

</script>

<!-- Conteneur de la carte (reste pareil) -->
<div bind:this={mapContainerElement} id={mapId} class="map-container-style" role="application" aria-label="Carte interactive">
    {#if !browser}
        <p>Carte interactive (chargement...)</p>
    {:else if isLoading}
        <p>Chargement de la carte...</p>
    {:else if errorLoading}
        <p class="map-error">Erreur: {errorLoading}</p>
    {/if}
</div>

<style>
    /* Le CSS reste identique */
    .map-container-style {
        height: 400px;
        width: 100%;
        background-color: #f0f0f0;
        border-radius: 8px;
        border: 1px solid #ccc;
        margin-top: 1rem;
        box-shadow: 0 1px 5px rgba(0,0,0,0.1);
        position: relative;
        overflow: hidden;
    }
    :global(#main-map.map-container-style) { height: 500px; }
    :global(#detail-map.map-container-style) { height: 300px; }
    .map-container-style p {
        position: absolute; top: 50%; left: 50%;
        transform: translate(-50%, -50%); color: #555;
        font-style: italic; text-align: center; padding: 0 1rem;
    }
    .map-error { color: #dc3545; font-weight: bold; font-style: normal; }
    :global(.leaflet-popup-content-wrapper) { border-radius: 5px; background-color: rgba(255, 255, 255, 0.9); box-shadow: 0 1px 5px rgba(0,0,0,0.2); }
    :global(.leaflet-popup-content) { font-size: 0.9rem; line-height: 1.4; margin: 10px 15px; max-height: 200px; overflow-y: auto; }
    :global(.leaflet-popup-content p) { margin: 0.5em 0; }
    :global(.leaflet-popup-content a) { color: var(--primary-color, #007bff); font-weight: bold; text-decoration: none; }
    :global(.leaflet-popup-content a:hover) { text-decoration: underline; }
    :global(.leaflet-container a.leaflet-popup-close-button) { color: #555 !important; padding: 6px 6px 0 0 !important; }
</style>