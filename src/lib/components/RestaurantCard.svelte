<script>
    import { favoritesStore } from '$lib/stores/favoritesStore'; // Import the store
    import { Heart } from 'lucide-svelte'; // Import the Heart icon

    export let restaurant;
    const defaultImage = '/assets/images/default-placeholder.jpg';

    // Reactive declaration to check if this restaurant is a favorite
    $: isFav = $favoritesStore.some(fav => fav.id === restaurant.id && fav.type === 'restaurant');

    // Function to toggle favorite status
    function toggleFavorite(event) {
        event.stopPropagation(); // IMPORTANT: Prevent link navigation
        event.preventDefault();

        if (isFav) {
            favoritesStore.remove('restaurant', restaurant.id);
        } else {
            favoritesStore.add('restaurant', restaurant.id, restaurant.name); // Pass name
        }
         console.log('Toggled favorite for restaurant:', restaurant.id, !isFav);
    }
</script>

<a href="/restaurants/{restaurant.id}" class="card-link">
    <article class="card">
         <!-- Favorite Button -->
         <button
            class="favorite-button"
            on:click={toggleFavorite}
            aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
            <Heart size={20} fill={isFav ? 'var(--sunset-orange)' : 'none'} stroke={isFav ? 'var(--sunset-orange)' : 'currentColor'} />
        </button>

        <img
            src={restaurant.image_url || defaultImage}
            alt="Image de {restaurant.name}"
            class="card-image"
            loading="lazy"
            onerror="this.onerror=null; this.src='{defaultImage}';"
        />
        <div class="card-content">
            <h3>{restaurant.name}</h3>
            {#if restaurant.cuisine_type || restaurant.price_range}
                 <div class="badges">
                     {#if restaurant.cuisine_type}
                        <span class="category-badge cuisine">{restaurant.cuisine_type}</span>
                     {/if}
                     {#if restaurant.price_range}
                        <span class="category-badge price">{restaurant.price_range}</span>
                     {/if}
                 </div>
            {/if}
            {#if restaurant.description}
                 <p>{restaurant.description.substring(0, 80)}{restaurant.description.length > 80 ? '...' : ''}</p> <!-- Reduced description length -->
            {/if}
        </div>
    </article>
</a>

<style>
    /* Styles virtually identical to PlaceCard.svelte for consistency */
    .card-link {
        text-decoration: none;
        color: inherit;
        display: block;
        border-radius: var(--radius-lg); /* Slightly larger radius */
        overflow: hidden;
        position: relative;
        background-color: var(--bg-secondary);
        border: 1px solid transparent;
        transition: transform var(--transition-normal) ease-in-out,
                    box-shadow var(--transition-normal) ease-in-out,
                    border-color var(--transition-normal) ease-in-out;
    }
    .card-link:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
        border-color: var(--ocean-blue-light);
    }
    .card {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    /* --- Favorite Button Styles (Identical to PlaceCard) --- */
    .favorite-button {
        position: absolute;
        top: var(--space-sm);
        right: var(--space-sm);
        background-color: rgba(255, 255, 255, 0.75);
        border: none;
        border-radius: var(--radius-full);
        padding: var(--space-xs);
        cursor: pointer;
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        transition: background-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast);
        backdrop-filter: blur(3px);
    }

    .favorite-button:hover {
        background-color: rgba(255, 255, 255, 0.95);
        color: var(--sunset-orange-dark);
        transform: scale(1.1);
    }

    :global([data-theme="dark"]) .favorite-button {
         background-color: rgba(50, 50, 50, 0.75);
         color: var(--text-secondary);
    }
    :global([data-theme="dark"]) .favorite-button:hover {
        background-color: rgba(70, 70, 70, 0.95);
         color: var(--sunset-orange-light);
    }
    /* --- End Favorite Button Styles --- */

    /* --- Card Image --- */
    .card-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
        display: block;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.05);
    }

    /* --- Card Content --- */
    .card-content {
        padding: var(--space-md) var(--space-lg);
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    h3 {
        margin-top: 0;
        margin-bottom: var(--space-sm);
        font-size: 1.15rem;
        color: var(--ocean-blue-dark);
        line-height: 1.3;
    }
    .badges {
        margin-bottom: var(--space-md); /* More space below badges */
        display: flex; /* Align badges horizontally */
        flex-wrap: wrap; /* Allow wrapping */
        gap: var(--space-sm); /* Gap between badges */
    }
    .category-badge {
        display: inline-block;
        padding: 0.25em 0.7em;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 500;
        /* Remove margin-right/bottom, use gap */
    }
     .category-badge.cuisine {
        background-color: var(--sandy-beige);
        color: var(--text-primary);
    }
     .category-badge.price {
        background-color: var(--ocean-blue-light);
        color: var(--ocean-blue-dark);
        font-weight: 600; /* Make price slightly bolder */
    }

    :global([data-theme="dark"]) .category-badge.cuisine {
        background-color: var(--sandy-beige-dark);
        color: var(--text-primary);
    }
     :global([data-theme="dark"]) .category-badge.price {
        background-color: var(--ocean-blue); /* Adjust dark theme price bg */
        color: white; /* Make price text white in dark mode */
    }


    p { /* Description */
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 0;
        line-height: 1.5;
        flex-grow: 1;
    }
</style>