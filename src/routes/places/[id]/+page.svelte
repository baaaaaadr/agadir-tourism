<script>
    import { browser } from '$app/environment'; // Pour vérifier si on est côté client
    import { onMount } from 'svelte';
    import Map from '$lib/components/Map.svelte'; // Importe le composant carte
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

    export let data; // Reçoit les données de +page.js
    $: place = data?.place;

    // Chemin vers l'image par défaut
    const defaultImage = '/assets/images/default-placeholder.jpg';

    // Fonction pour générer le lien Google Maps
    function getGoogleMapsLink(lat, lon) {
        if (lat != null && lon != null) {
            return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
        }
        return '#';
    }

    // État pour le composant Map
    let mapMarkers = [];
    let mapCenter = [30.4202, -9.5982]; // Centre par défaut (Agadir)
    let mapZoom = 15;

    // Met à jour les marqueurs et le centre quand 'place' est chargé
     $: if (place && place.latitude && place.longitude) {
         mapMarkers = [{
             lat: place.latitude,
             lon: place.longitude,
             popupText: `<b>${place.name}</b>`
         }];
         mapCenter = [place.latitude, place.longitude];
     } else if (place) {
          mapMarkers = []; // Pas de marqueur si pas de coordonnées
     }

</script>

<svelte:head>
    <title>{place ? place.name : 'Détails'} - Visit Agadir</title>
    {#if place?.description}
       <meta name="description" content={place.description.substring(0, 160)} />
    {/if}
</svelte:head>

{#if place}
    <article class="place-details">
        <a href="/" class="back-button">← Retour à la liste</a>

        <h1>{place.name}</h1>

        {#if place.category}
            <span class="category-badge">{place.category}</span>
        {/if}

        <img
            src={place.image_url || defaultImage}
            alt="Image de {place.name}"
            class="detail-image"
            onerror="this.onerror=null; this.src='{defaultImage}';"
        />

        {#if place.description}
            <div class="description">
                <h2>Description</h2>
                <p>{place.description}</p>
            </div>
        {/if}

        <div class="details-grid">
             {#if place.address}
                <div class="detail-item">
                    <strong>Adresse :</strong>
                    <p>{place.address}</p>
                </div>
            {/if}
            {#if place.phone}
                <div class="detail-item">
                    <strong>Téléphone :</strong>
                    <p><a href="tel:{place.phone}">{place.phone}</a></p>
                </div>
            {/if}
             {#if place.website}
                <div class="detail-item">
                    <strong>Site Web :</strong>
                    <p><a href={place.website} target="_blank" rel="noopener noreferrer">{place.website}</a></p>
                </div>
            {/if}
        </div>


        {#if place.latitude && place.longitude}
            <div class="map-section">
                <h2>Localisation</h2>
                 {#if browser} <!-- Important: Ne rend le composant Map que côté client -->
                    <Map markers={mapMarkers} center={mapCenter} zoom={mapZoom} mapId="detail-map" />
                 {:else}
                     <div style="height: 300px; background: #eee; display: flex; align-items: center; justify-content: center;">Carte en cours de chargement...</div>
                 {/if}
                <a
                    href={getGoogleMapsLink(place.latitude, place.longitude)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="directions-button">
                    Obtenir l'itinéraire (Google Maps)
                </a>
            </div>
        {/if}

    </article>
{:else}
     <!-- Affiche un spinner pendant que `place` est indéfini (chargement initial) -->
    <LoadingSpinner />
{/if}

<style>
    .place-details {
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h1 {
        margin-top: 0;
        color: #0077cc;
    }

    .category-badge {
        display: inline-block;
        background-color: #e2e3e5;
        color: #495057;
        padding: 0.2em 0.6em;
        border-radius: 0.25rem;
        font-size: 0.9em;
        margin-bottom: 1rem;
    }

    .detail-image {
        width: 100%;
        max-height: 400px; /* Limite la hauteur de l'image */
        object-fit: cover;
        border-radius: 5px;
        margin-bottom: 1.5rem;
    }

    .description h2, .map-section h2 {
        color: #333;
        margin-bottom: 0.5rem;
        margin-top: 1.5rem;
        font-size: 1.3rem;
    }
    .description p {
         white-space: pre-wrap; /* Préserve les retours à la ligne dans la description */
         line-height: 1.7;
    }


    .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
    }
    .detail-item strong {
        display: block;
        margin-bottom: 0.3rem;
        color: #555;
    }
     .detail-item p {
         margin: 0;
     }

    .map-section {
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
    }

    .directions-button {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.7rem 1.2rem;
        background-color: #28a745;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.2s;
    }
    .directions-button:hover {
        background-color: #218838;
        text-decoration: none;
    }

</style>