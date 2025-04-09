<script>
    import { browser } from '$app/environment';
    import { favoritesStore } from '$lib/stores/favoritesStore'; // Import favorites store
    import Map from '$lib/components/Map.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { Heart, ArrowLeft, ExternalLink } from 'lucide-svelte'; // Import icons

    export let data;
    $: restaurant = data?.restaurant;

    const defaultImage = '/assets/images/default-placeholder.jpg';

    // --- Map State ---
    let mapMarkers = [];
    let mapCenter = [30.4202, -9.5982];
    let mapZoom = 15;

    $: if (restaurant && restaurant.latitude && restaurant.longitude) {
        mapMarkers = [{ lat: restaurant.latitude, lon: restaurant.longitude, popupText: `<b>${restaurant.name}</b>` }];
        mapCenter = [restaurant.latitude, restaurant.longitude];
    } else if (restaurant) {
        mapMarkers = [];
    }

    // --- Favorite State ---
    $: isFav = restaurant ? $favoritesStore.some(fav => fav.id === restaurant.id && fav.type === 'restaurant') : false;

    function toggleFavorite() {
        if (!restaurant) return;
        if (isFav) {
            favoritesStore.remove('restaurant', restaurant.id);
        } else {
            favoritesStore.add('restaurant', restaurant.id, restaurant.name);
        }
    }

    // --- Helper ---
    function getGoogleMapsLink(lat, lon) {
         return (lat != null && lon != null) ? `https://www.google.com/maps/search/?api=1&query=${lat},${lon}` : '#';
    }
</script>

<svelte:head>
    <title>{restaurant ? restaurant.name : 'Détails'} - Visit Agadir</title>
    {#if restaurant?.description}
       <meta name="description" content={restaurant.description.substring(0, 160)} />
    {/if}
</svelte:head>

{#if restaurant}
    <article class="detail-page-container">

         <!-- Back Button -->
         <a href="/restaurants" class="back-button btn btn-text"> <!-- Use button class -->
             <ArrowLeft size={18} /> Retour à la liste
         </a>

        <!-- Header Section -->
        <header class="detail-header">
            <h1>{restaurant.name}</h1>
            <button
                class="favorite-button-detail"
                on:click={toggleFavorite}
                aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
                <Heart size={24} fill={isFav ? 'var(--sunset-orange)' : 'none'} stroke={isFav ? 'var(--sunset-orange)' : 'currentColor'} />
            </button>
        </header>

        <!-- Badges -->
         {#if restaurant.cuisine_type || restaurant.price_range}
             <div class="detail-badges">
                 {#if restaurant.cuisine_type}
                    <span class="category-badge cuisine">{restaurant.cuisine_type}</span>
                 {/if}
                 {#if restaurant.price_range}
                    <span class="category-badge price">{restaurant.price_range}</span>
                 {/if}
             </div>
        {/if}

        <!-- Image -->
        <img
            src={restaurant.image_url || defaultImage}
            alt="Image de {restaurant.name}"
            class="detail-image"
            onerror="this.onerror=null; this.src='{defaultImage}';"
        />

        <!-- Core Info Sections -->
        <div class="content-grid">
            <!-- Left Column -->
            <div class="main-content">
                 {#if restaurant.description}
                    <section class="content-section description">
                        <h2>Description</h2>
                        <p>{restaurant.description}</p>
                    </section>
                {/if}

                {#if restaurant.latitude && restaurant.longitude}
                    <section class="content-section map-section">
                        <h2>Localisation</h2>
                         {#if browser}
                            <Map markers={mapMarkers} center={mapCenter} zoom={mapZoom} mapId="detail-map-resto" />
                         {:else}
                             <div class="map-placeholder">Chargement de la carte...</div>
                         {/if}
                        <a
                            href={getGoogleMapsLink(restaurant.latitude, restaurant.longitude)}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-secondary directions-button">
                            Itinéraire (Google Maps) <ExternalLink size={16} style="display:inline-block; vertical-align: middle; margin-left: 4px;" />
                        </a>
                    </section>
                {/if}
            </div>

            <!-- Right Column -->
             {#if restaurant.address || restaurant.phone || restaurant.website}
                 <aside class="sidebar-content content-section">
                    <h2>Informations</h2>
                    <div class="details-list">
                        {#if restaurant.address}
                            <div class="detail-item">
                                <strong><span class="icon">📍</span> Adresse :</strong>
                                <p>{restaurant.address}</p>
                            </div>
                        {/if}
                        {#if restaurant.phone}
                            <div class="detail-item">
                                <strong><span class="icon">📞</span> Téléphone :</strong>
                                <p><a href="tel:{restaurant.phone}">{restaurant.phone}</a></p>
                            </div>
                        {/if}
                         {#if restaurant.website}
                            <div class="detail-item">
                                <strong><span class="icon">🌐</span> Site Web :</strong>
                                <p><a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a></p>
                            </div>
                        {/if}
                        <!-- Add opening hours, etc. -->
                     </div>
                 </aside>
            {/if}
        </div>

    </article>
{:else}
     <div class="loading-container">
        <LoadingSpinner />
    </div>
{/if}

<style>
    /* Reuse styles from Place detail page */
    .detail-page-container { padding-bottom: var(--space-xxl); }
    .loading-container { display: flex; justify-content: center; padding: var(--space-xxl); }
    .back-button { display: inline-flex; align-items: center; gap: var(--space-xs); margin-bottom: var(--space-lg); font-weight: 500; color: var(--text-secondary); text-decoration: none; }
    .back-button:hover { color: var(--ocean-blue); background-color: transparent; text-decoration: underline; }
    .detail-header { display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-md); margin-bottom: var(--space-xs); }
    .detail-header h1 { margin-top: 0; margin-bottom: 0; color: var(--ocean-blue-dark); font-size: 2.2rem; line-height: 1.2; flex-grow: 1; }
    .favorite-button-detail { background: transparent; border: none; color: var(--text-secondary); cursor: pointer; padding: var(--space-sm); border-radius: var(--radius-full); transition: background-color var(--transition-fast), color var(--transition-fast); flex-shrink: 0; margin-top: -5px; }
    .favorite-button-detail:hover { background-color: var(--sandy-beige-light); color: var(--sunset-orange-dark); }

     /* Specific badge styling */
     .detail-badges { margin-bottom: var(--space-lg); }
     .category-badge { display: inline-block; background-color: var(--sandy-beige); color: var(--text-primary); padding: 0.3em 0.8em; border-radius: var(--radius-sm); font-size: 0.9em; font-weight: 500; margin-right: var(--space-sm); margin-bottom: var(--space-xs); }
     .category-badge.price { background-color: var(--ocean-blue-light); color: var(--ocean-blue-dark); font-weight: 500; }

    .detail-image { width: 100%; max-height: 450px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: var(--space-xl); box-shadow: var(--shadow-md); }

     .content-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-xl); }
     @media (min-width: 768px) { .content-grid { grid-template-columns: 2fr 1fr; } }

    .content-section { margin-bottom: var(--space-lg); }
    .content-section h2 { color: var(--ocean-blue); font-size: 1.5rem; margin-top: 0; margin-bottom: var(--space-md); padding-bottom: var(--space-sm); border-bottom: 1px solid var(--border-color); }
    .description p { white-space: pre-wrap; line-height: 1.7; color: var(--text-primary); }

    .map-placeholder { height: 300px; background: #eee; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); color: var(--text-secondary); font-style: italic; }
     :global(#detail-map-resto.map-container-style) { height: 300px; margin-bottom: var(--space-md); }
    .directions-button { margin-top: var(--space-lg); display: inline-flex; align-items: center; }

    .sidebar-content { background-color: var(--bg-secondary); padding: var(--space-lg); border-radius: var(--radius-md); border: 1px solid var(--border-color); align-self: flex-start; }
    .details-list { display: flex; flex-direction: column; gap: var(--space-lg); }
    .detail-item strong { display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-xs); color: var(--text-primary); font-weight: 600; }
    .detail-item strong .icon { font-size: 1.1em; color: var(--ocean-blue); }
    .detail-item p { margin: 0; color: var(--text-secondary); padding-left: calc(var(--space-sm) + 1.1em); }
    .detail-item p a { color: var(--ocean-blue); text-decoration: underline; }
    .detail-item p a:hover { color: var(--ocean-blue-dark); }

</style>