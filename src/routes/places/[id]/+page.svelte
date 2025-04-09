<script>
    import { browser } from '$app/environment';
    import { favoritesStore } from '$lib/stores/favoritesStore'; // Import favorites store
    import Map from '$lib/components/Map.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { Heart, ArrowLeft, ExternalLink } from 'lucide-svelte'; // Import icons

    export let data;
    $: place = data?.place;

    const defaultImage = '/assets/images/default-placeholder.jpg';

    // --- Map State ---
    let mapMarkers = [];
    let mapCenter = [30.4202, -9.5982]; // Default Agadir center
    let mapZoom = 15;

    $: if (place && place.latitude && place.longitude) {
        mapMarkers = [{ lat: place.latitude, lon: place.longitude, popupText: `<b>${place.name}</b>` }];
        mapCenter = [place.latitude, place.longitude];
    } else if (place) {
        mapMarkers = [];
    }

    // --- Favorite State ---
    $: isFav = place ? $favoritesStore.some(fav => fav.id === place.id && fav.type === 'place') : false;

    function toggleFavorite() {
        if (!place) return; // Should not happen if button is shown
        if (isFav) {
            favoritesStore.remove('place', place.id);
        } else {
            favoritesStore.add('place', place.id, place.name);
        }
    }

    // --- Helper ---
    function getGoogleMapsLink(lat, lon) {
        return (lat != null && lon != null) ? `https://www.google.com/maps/search/?api=1&query=${lat},${lon}` : '#';
    }
</script>

<svelte:head>
    <title>{place ? place.name : 'Détails'} - Visit Agadir</title>
    {#if place?.description}
       <meta name="description" content={place.description.substring(0, 160)} />
    {/if}
</svelte:head>

{#if place}
    <article class="detail-page-container">

        <!-- Back Button -->
         <a href="/places" class="back-button btn btn-text"> <!-- Use button class -->
             <ArrowLeft size={18} /> Retour à la liste
         </a>

        <!-- Header Section -->
        <header class="detail-header">
            <h1>{place.name}</h1>
            <button
                class="favorite-button-detail"
                on:click={toggleFavorite}
                aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
                <Heart size={24} fill={isFav ? 'var(--sunset-orange)' : 'none'} stroke={isFav ? 'var(--sunset-orange)' : 'currentColor'} />
            </button>
        </header>

        {#if place.category}
            <span class="category-badge">{place.category}</span>
        {/if}

        <!-- Image -->
        <img
            src={place.image_url || defaultImage}
            alt="Image de {place.name}"
            class="detail-image"
            onerror="this.onerror=null; this.src='{defaultImage}';"
        />

        <!-- Core Info Sections -->
        <div class="content-grid">
            <!-- Left Column (Description, Map) -->
            <div class="main-content">
                {#if place.description}
                    <section class="content-section description">
                        <h2>Description</h2>
                        <p>{place.description}</p>
                    </section>
                {/if}

                {#if place.latitude && place.longitude}
                    <section class="content-section map-section">
                        <h2>Localisation</h2>
                         {#if browser}
                            <Map markers={mapMarkers} center={mapCenter} zoom={mapZoom} mapId="detail-map" />
                         {:else}
                             <div class="map-placeholder">Chargement de la carte...</div>
                         {/if}
                        <a
                            href={getGoogleMapsLink(place.latitude, place.longitude)}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-secondary directions-button"> <!-- Use button class -->
                            Itinéraire (Google Maps) <ExternalLink size={16} style="display:inline-block; vertical-align: middle; margin-left: 4px;" />
                        </a>
                    </section>
                {/if}
            </div>

            <!-- Right Column (Details) -->
             {#if place.address || place.phone || place.website}
                <aside class="sidebar-content content-section">
                    <h2>Informations</h2>
                    <div class="details-list">
                        {#if place.address}
                            <div class="detail-item">
                                <strong><span class="icon">📍</span> Adresse :</strong>
                                <p>{place.address}</p>
                            </div>
                        {/if}
                        {#if place.phone}
                            <div class="detail-item">
                                <strong><span class="icon">📞</span> Téléphone :</strong>
                                <p><a href="tel:{place.phone}">{place.phone}</a></p>
                            </div>
                        {/if}
                        {#if place.website}
                            <div class="detail-item">
                                <strong><span class="icon">🌐</span> Site Web :</strong>
                                <p><a href={place.website} target="_blank" rel="noopener noreferrer">{place.website}</a></p>
                            </div>
                        {/if}
                        <!-- Add other details like opening hours if available in data -->
                    </div>
                </aside>
             {/if}
        </div>

    </article>
{:else}
    <!-- Show loading spinner during initial load -->
    <div class="loading-container">
        <LoadingSpinner />
    </div>
{/if}

<style>
    .detail-page-container {
        /* Inherits max-width from main layout */
        /* background-color: var(--bg-primary); Optional: if different from body */
        padding-bottom: var(--space-xxl); /* Space at the bottom */
    }

    .loading-container {
         display: flex;
         justify-content: center;
         padding: var(--space-xxl);
    }

     /* --- Back Button --- */
     .back-button {
        display: inline-flex; /* Align icon and text */
        align-items: center;
        gap: var(--space-xs);
        margin-bottom: var(--space-lg);
        font-weight: 500;
        color: var(--text-secondary);
        text-decoration: none;
    }
    .back-button:hover {
        color: var(--ocean-blue);
        background-color: transparent; /* Override btn-text hover potentially */
        text-decoration: underline;
    }
     /* --- Header --- */
    .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start; /* Align items top */
        gap: var(--space-md);
        margin-bottom: var(--space-xs);
    }

    .detail-header h1 {
        margin-top: 0;
        margin-bottom: 0;
        color: var(--ocean-blue-dark);
        font-size: 2.2rem; /* Slightly larger */
         line-height: 1.2;
         flex-grow: 1; /* Allow title to take space */
    }

    .favorite-button-detail {
         background: transparent;
         border: none;
         color: var(--text-secondary); /* Default color */
         cursor: pointer;
         padding: var(--space-sm); /* More clickable area */
         border-radius: var(--radius-full);
         transition: background-color var(--transition-fast), color var(--transition-fast);
         flex-shrink: 0; /* Prevent shrinking */
         margin-top: -5px; /* Adjust vertical alignment slightly */
    }
     .favorite-button-detail:hover {
        background-color: var(--sandy-beige-light);
        color: var(--sunset-orange-dark);
     }


     /* --- Badges & Image --- */
    .category-badge {
        display: inline-block;
        background-color: var(--sandy-beige);
        color: var(--text-primary);
        padding: 0.3em 0.8em;
        border-radius: var(--radius-sm);
        font-size: 0.9em;
        font-weight: 500;
        margin-bottom: var(--space-lg);
    }

    .detail-image {
        width: 100%;
        max-height: 450px;
        object-fit: cover;
        border-radius: var(--radius-md);
        margin-bottom: var(--space-xl);
        box-shadow: var(--shadow-md);
    }

    /* --- Content Layout --- */
     .content-grid {
        display: grid;
        grid-template-columns: 1fr; /* Single column by default */
        gap: var(--space-xl);
     }

     @media (min-width: 768px) {
         .content-grid {
             /* Two columns on larger screens: main content + sidebar */
             grid-template-columns: 2fr 1fr; /* Main content takes 2/3, sidebar 1/3 */
         }
     }

    .content-section {
         /* Common styling for sections */
         /* background-color: var(--bg-secondary); */
         /* padding: var(--space-lg); */
         /* border-radius: var(--radius-md); */
         margin-bottom: var(--space-lg); /* Ensure spacing even in single column */
    }
     .content-section h2 {
        color: var(--ocean-blue);
        font-size: 1.5rem;
        margin-top: 0;
        margin-bottom: var(--space-md);
        padding-bottom: var(--space-sm);
        border-bottom: 1px solid var(--border-color);
    }

     .description p {
         white-space: pre-wrap;
         line-height: 1.7;
         color: var(--text-primary);
     }

    /* --- Map Section --- */
    .map-placeholder {
         height: 300px;
         background: #eee;
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: var(--radius-md);
         color: var(--text-secondary);
         font-style: italic;
    }
    /* Use global styling for the map container defined in Map.svelte */
     :global(#detail-map.map-container-style) {
         height: 300px; /* Ensure height */
         margin-bottom: var(--space-md);
     }
    .directions-button {
        margin-top: var(--space-lg);
        display: inline-flex; /* Align icon */
        align-items: center;
    }

    /* --- Sidebar Details --- */
    .sidebar-content {
         background-color: var(--bg-secondary);
         padding: var(--space-lg);
         border-radius: var(--radius-md);
         border: 1px solid var(--border-color);
          align-self: flex-start; /* Prevent stretching in grid */
    }
    .details-list {
         display: flex;
         flex-direction: column;
         gap: var(--space-lg);
    }
    .detail-item strong {
        display: flex; /* Align icon and text */
        align-items: center;
        gap: var(--space-sm);
        margin-bottom: var(--space-xs);
        color: var(--text-primary);
        font-weight: 600;
    }
     .detail-item strong .icon {
         font-size: 1.1em;
         color: var(--ocean-blue);
     }
     .detail-item p {
         margin: 0;
         color: var(--text-secondary);
         padding-left: calc(var(--space-sm) + 1.1em); /* Indent text below icon */
     }
     .detail-item p a {
         color: var(--ocean-blue);
         text-decoration: underline;
     }
      .detail-item p a:hover {
         color: var(--ocean-blue-dark);
     }

</style>