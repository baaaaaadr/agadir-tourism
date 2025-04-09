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
    /* Styles very similar to PlaceCard.svelte */
    .card-link {
        text-decoration: none;
        color: inherit;
        display: block;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        border-radius: var(--radius-md);
        overflow: hidden;
         position: relative; /* Needed for button */
         background-color: var(--bg-secondary);
    }
    .card-link:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    .card {
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
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
        background-color: rgba(255, 255, 255, 0.7);
        border: none;
        border-radius: var(--radius-full);
        padding: var(--space-xs);
        cursor: pointer;
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        transition: background-color var(--transition-fast), color var(--transition-fast);
         backdrop-filter: blur(2px);
    }

    .favorite-button:hover {
        background-color: rgba(255, 255, 255, 0.9);
         color: var(--sunset-orange-dark);
    }
    /* --- End Favorite Button Styles --- */

    .card-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }
    .card-content {
        padding: var(--space-md);
        flex-grow: 1;
    }
    h3 {
        margin-top: 0;
        margin-bottom: var(--space-sm);
        font-size: 1.2rem;
        color: var(--ocean-blue-dark);
    }
    .badges {
        margin-bottom: var(--space-sm);
    }
    .category-badge {
        display: inline-block;
        background-color: var(--sandy-beige-light);
        color: var(--text-secondary);
        padding: 0.2em 0.6em;
        border-radius: var(--radius-sm);
        font-size: 0.8em;
        margin-right: var(--space-xs);
        margin-bottom: var(--space-xs); /* Allow wrapping */
    }
     .category-badge.price {
        background-color: var(--ocean-blue-light); /* Different color for price */
        color: var(--ocean-blue-dark);
        font-weight: 500;
    }
    p {
        font-size: 0.95rem;
        color: var(--text-secondary);
        margin-bottom: 0;
         line-height: 1.5;
    }
</style>