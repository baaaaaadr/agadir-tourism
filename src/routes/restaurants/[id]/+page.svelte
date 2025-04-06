<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import Map from '$lib/components/Map.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

    export let data;
    $: restaurant = data?.restaurant;

    const defaultImage = '/assets/images/default-placeholder.jpg';

    function getGoogleMapsLink(lat, lon) {
        if (lat != null && lon != null) {
            return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
        }
        return '#';
    }

    // Map state
    let mapMarkers = [];
    let mapCenter = [30.4202, -9.5982]; // Agadir center
    let mapZoom = 15;

     $: if (restaurant && restaurant.latitude && restaurant.longitude) {
         mapMarkers = [{
             lat: restaurant.latitude,
             lon: restaurant.longitude,
             popupText: `<b>${restaurant.name}</b>`
         }];
         mapCenter = [restaurant.latitude, restaurant.longitude];
     } else if (restaurant) {
          mapMarkers = [];
     }

</script>

<svelte:head>
    <title>{restaurant ? restaurant.name : 'Détails'} - Visit Agadir</title>
    {#if restaurant?.description}
       <meta name="description" content={restaurant.description.substring(0, 160)} />
    {/if}
</svelte:head>

{#if restaurant}
    <article class="restaurant-details">
        <a href="/" class="back-button">← Retour à la liste</a>

        <h1>{restaurant.name}</h1>

         {#if restaurant.cuisine_type || restaurant.price_range}
             <div class="badges" style="margin-bottom: 1rem;">
                 {#if restaurant.cuisine_type}
                    <span class="category-badge cuisine">{restaurant.cuisine_type}</span>
                 {/if}
                 {#if restaurant.price_range}
                    <span class="category-badge price">{restaurant.price_range}</span>
                 {/if}
             </div>
        {/if}

        <img
            src={restaurant.image_url || defaultImage}
            alt="Image de {restaurant.name}"
            class="detail-image"
            onerror="this.onerror=null; this.src='{defaultImage}';"
        />

        {#if restaurant.description}
            <div class="description">
                <h2>Description</h2>
                <p>{restaurant.description}</p>
            </div>
        {/if}

         <div class="details-grid">
             {#if restaurant.address}
                <div class="detail-item">
                    <strong>Adresse :</strong>
                    <p>{restaurant.address}</p>
                </div>
            {/if}
            {#if restaurant.phone}
                <div class="detail-item">
                    <strong>Téléphone :</strong>
                    <p><a href="tel:{restaurant.phone}">{restaurant.phone}</a></p>
                </div>
            {/if}
             {#if restaurant.website}
                <div class="detail-item">
                    <strong>Site Web :</strong>
                    <p><a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a></p>
                </div>
            {/if}
        </div>


        {#if restaurant.latitude && restaurant.longitude}
            <div class="map-section">
                <h2>Localisation</h2>
                 {#if browser}
                    <Map markers={mapMarkers} center={mapCenter} zoom={mapZoom} mapId="detail-map-resto" />
                 {:else}
                      <div style="height: 300px; background: #eee; display: flex; align-items: center; justify-content: center;">Carte en cours de chargement...</div>
                 {/if}
                <a
                    href={getGoogleMapsLink(restaurant.latitude, restaurant.longitude)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="directions-button">
                    Obtenir l'itinéraire (Google Maps)
                </a>
            </div>
        {/if}

    </article>
{:else}
    <LoadingSpinner />
{/if}

<style>
    /* Copie les styles de la page détail lieu ou crée des styles spécifiques */
     .restaurant-details {
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
     h1 { margin-top: 0; color: #0077cc; }
     .detail-image { width: 100%; max-height: 400px; object-fit: cover; border-radius: 5px; margin-bottom: 1.5rem; }
     .description h2, .map-section h2 { color: #333; margin-bottom: 0.5rem; margin-top: 1.5rem; font-size: 1.3rem; }
     .description p { white-space: pre-wrap; line-height: 1.7; }
     .details-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #eee; }
     .detail-item strong { display: block; margin-bottom: 0.3rem; color: #555; }
     .detail-item p { margin: 0; }
     .map-section { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; }
     .directions-button { display: inline-block; margin-top: 1rem; padding: 0.7rem 1.2rem; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; transition: background-color 0.2s; }
     .directions-button:hover { background-color: #218838; text-decoration: none; }

     /* Badges spécifiques restaurant */
     .badges { margin-bottom: 1rem; }
    .category-badge { display: inline-block; background-color: #e2e3e5; color: #495057; padding: 0.2em 0.6em; border-radius: 0.25rem; font-size: 0.9em; margin-right: 0.4rem; }
     .category-badge.price { background-color: #d1ecf1; color: #0c5460; }
</style>