<script>
    import { browser } from '$app/environment';
    import { onMount, onDestroy, tick } from 'svelte';

    // Props
    export let center = [30.4202, -9.5982];
    export let zoom = 13;
    export let markers = [];
    export let mapId = 'leaflet-map';
    export let minZoom = 10; // Optional: Set a minimum zoom level

    // RÃ©fÃ©rences et Ã©tat interne
    let mapContainerElement = null;
    let mapInstance = null;
    let markerLayerGroup = null;
    let L = null;

    let isLoading = true;
    let errorLoading = null;

    // --- !!! DEFINE YOUR BOUNDS HERE !!! ---
    // IMPORTANT: Replace these coordinates with precise ones for your desired area!
    const southWest = L ? L.latLng(30.0, -10.0) : null; // Estimated SW corner (Lat, Lng)
    const northEast = L ? L.latLng(30.7, -8.8) : null; // Estimated NE corner (Lat, Lng)
    const mapBounds = L && southWest && northEast ? L.latLngBounds(southWest, northEast) : null;
    // --- End Bounds Definition ---


    onMount(async () => {
        if (browser) {
            await tick();

            if (!mapContainerElement) {
                 console.error(`[${mapId}] Ã‰lÃ©ment conteneur introuvable au montage.`);
                 errorLoading = "Erreur interne: Conteneur de carte non trouvÃ©.";
                 isLoading = false;
                 return;
             }
            if (typeof window.L === 'undefined' || window.L === null) {
                console.error(`[${mapId}] ERREUR: Objet global L non trouvÃ©.`);
                errorLoading = "Impossible de charger la librairie de carte (CDN).";
                isLoading = false;
                return;
            }

            L = window.L; // Assign global L
             console.log(`[${mapId}] Objet global L trouvÃ©.`);

            // --- Re-create bounds object now that L is defined ---
            // You could also move the const definitions inside onMount if L is guaranteed
            const sw = L.latLng(30.0, -10.0); // Re-define or use variable from outer scope if safe
            const ne = L.latLng(30.7, -8.8);
            const boundsForMap = L.latLngBounds(sw, ne);
            // ---

            if (mapContainerElement && !mapInstance) {
                 // Pass bounds to initializeMap
                 initializeMap(boundsForMap);
            }
            isLoading = false;

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
        }
    });

    // --- MODIFIED: Accept bounds as argument ---
    function initializeMap(boundsToSet) {
        if (!L || !mapContainerElement || mapInstance) return;

        console.log(`[${mapId}] Initialisation de la carte Leaflet via CDN.`);
        try {
            // --- ADD maxBounds and maxBoundsViscosity ---
            mapInstance = L.map(mapContainerElement, {
                 maxBounds: boundsToSet,          // Restrict panning/zooming
                 maxBoundsViscosity: 1.0,      // Make bounds solid
                 minZoom: minZoom              // Optional: Prevent zooming too far out
            }).setView(center, zoom);
            // --- End additions ---


            // Ensure the initial view is within the bounds
             if (boundsToSet && !boundsToSet.contains(mapInstance.getCenter())) {
                 console.warn(`[${mapId}] Initial center is outside maxBounds. Fitting bounds.`);
                 mapInstance.fitBounds(boundsToSet); // Adjust view to fit bounds
             }


            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Â© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);

            markerLayerGroup = L.layerGroup().addTo(mapInstance);
            updateMapMarkers(markers);

            // Invalidate size after a short delay
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
        // ... (keep existing code)
         if (!mapInstance || !markerLayerGroup || !L) return;
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
                    console.error(`[${mapId}] Erreur crÃ©ation marqueur (CDN): `, markerInfo, e);
                 }
            }
         });
    }

    // --- Reactivity (keep existing code) ---
     $: if (mapInstance && L) {
        updateMapMarkers(markers);
     }
    // $: if (mapInstance && L && center && zoom) {
        // Maybe disable automatic setView if bounds are active? Or ensure new center/zoom is valid.
        // mapInstance.setView(center, zoom);
    // }

</script>

<!-- HTML and Style blocks remain the same -->
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
    .map-container-style { height: 400px; width: 100%; background-color: #f0f0f0; border-radius: 8px; border: 1px solid #ccc; margin-top: 1rem; box-shadow: 0 1px 5px rgba(0,0,0,0.1); position: relative; overflow: hidden; }
    :global(#main-map.map-container-style) { height: 500px; }
    :global(#detail-map.map-container-style) { height: 300px; }
    :global(#detail-map-resto.map-container-style) { height: 300px; } /* Added for restaurant detail map */
    .map-container-style p { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #555; font-style: italic; text-align: center; padding: 0 1rem; }
    .map-error { color: #dc3545; font-weight: bold; font-style: normal; }
    :global(.leaflet-popup-content-wrapper) { border-radius: 5px; background-color: rgba(255, 255, 255, 0.9); box-shadow: 0 1px 5px rgba(0,0,0,0.2); }
    :global(.leaflet-popup-content) { font-size: 0.9rem; line-height: 1.4; margin: 10px 15px; max-height: 200px; overflow-y: auto; }
    :global(.leaflet-popup-content p) { margin: 0.5em 0; }
    :global(.leaflet-popup-content a) { color: var(--ocean-blue, #0077cc); font-weight: bold; text-decoration: none; } /* Use variable */
    :global(.leaflet-popup-content a:hover) { text-decoration: underline; }
    :global(.leaflet-container a.leaflet-popup-close-button) { color: #555 !important; padding: 6px 6px 0 0 !important; }
</style>