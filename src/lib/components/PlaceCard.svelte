<script>
    import { favoritesStore } from '$lib/stores/favoritesStore'; // Import the store
    import { Heart } from 'lucide-svelte'; // Import the Heart icon

    export let place;

    // Chemin vers l'image par dÃ©faut
    const defaultImage = '/assets/images/default-placeholder.jpg';

    // Reactive declaration to check if this place is a favorite
    // It automatically updates when the store changes
    $: isFav = $favoritesStore.some(fav => fav.id === place.id && fav.type === 'place');

    // Function to toggle favorite status
    function toggleFavorite(event) {
        event.stopPropagation(); // IMPORTANT: Prevent link navigation when clicking the heart
        event.preventDefault(); // Also prevent default anchor behavior just in case

        if (isFav) {
            favoritesStore.remove('place', place.id);
        } else {
            favoritesStore.add('place', place.id, place.name); // Pass name for context
        }
         console.log('Toggled favorite for place:', place.id, !isFav);
    }
</script>

<a href="/places/{place.id}" class="card-link">
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
            src={place.image_url || defaultImage}
            alt="Image de {place.name}"
            class="card-image"
            loading="lazy"
            onerror="this.onerror=null; this.src='{defaultImage}';"
        />
        <div class="card-content">
            <h3>{place.name}</h3>
            {#if place.category}
                <span class="category-badge">{place.category}</span>
            {/if}
            {#if place.description}
                <p>{place.description.substring(0, 80)}{place.description.length > 80 ? '...' : ''}</p>  <!-- Reduced description length slightly -->
            {/if}
        </div>
    </article>
</a>

<style>
    .card-link {
        text-decoration: none;
        color: inherit;
        display: block;
        border-radius: var(--radius-lg); /* Slightly larger radius for a softer look */
        overflow: hidden;
        position: relative; /* Needed for absolute positioning of the button */
        background-color: var(--bg-secondary);
        border: 1px solid transparent; /* Start with transparent border */
        transition: transform var(--transition-normal) ease-in-out,
                    box-shadow var(--transition-normal) ease-in-out,
                    border-color var(--transition-normal) ease-in-out; /* Add border-color transition */
    }
    .card-link:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
        border-color: var(--ocean-blue-light); /* Highlight with subtle blue border on hover */
    }

    .card {
        /* background-color: var(--bg-secondary); - Removed, handled by card-link */
        /* border-radius: var(--radius-lg); - Removed, handled by card-link */
        /* box-shadow: var(--shadow-md); - Base shadow is on card-link, hover enhances it */
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    /* --- Favorite Button Styles --- */
    .favorite-button {
        position: absolute;
        top: var(--space-sm);
        right: var(--space-sm);
        background-color: rgba(255, 255, 255, 0.75); /* Slightly less transparent */
        border: none;
        border-radius: var(--radius-full);
        padding: var(--space-xs);
        cursor: pointer;
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        transition: background-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast); /* Added transform */
        backdrop-filter: blur(3px); /* Slightly stronger blur */
    }

    .favorite-button:hover {
        background-color: rgba(255, 255, 255, 0.95);
        color: var(--sunset-orange-dark);
        transform: scale(1.1); /* Add subtle scale on hover */
    }

    :global([data-theme="dark"]) .favorite-button {
         background-color: rgba(50, 50, 50, 0.75); /* Darker background for dark mode */
         color: var(--text-secondary);
    }
    :global([data-theme="dark"]) .favorite-button:hover {
        background-color: rgba(70, 70, 70, 0.95);
         color: var(--sunset-orange-light); /* Lighter orange for dark mode hover */
    }


    /* --- Card Image --- */
    .card-image {
        width: 100%;
        height: 180px; /* Keep height consistent */
        object-fit: cover;
        display: block; /* Ensure no extra space */
        /* Subtle inner shadow to lift image from background */
        box-shadow: inset 0 0 5px rgba(0,0,0,0.05);
    }

    /* --- Card Content --- */
    .card-content {
        padding: var(--space-md) var(--space-lg); /* More horizontal padding */
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    h3 {
        margin-top: 0;
        margin-bottom: var(--space-sm);
        font-size: 1.15rem; /* Slightly smaller title */
        color: var(--ocean-blue-dark);
        line-height: 1.3;
    }

    .category-badge {
        display: inline-block;
        background-color: var(--sandy-beige); /* Slightly darker beige */
        color: var(--text-primary); /* Better contrast */
        padding: 0.25em 0.7em; /* Adjust padding */
        border-radius: var(--radius-sm);
        font-size: 0.75rem; /* Smaller badge text */
        font-weight: 500;
        margin-bottom: var(--space-md); /* More space below badge */
        align-self: flex-start; /* Prevent badge stretching */
    }

    :global([data-theme="dark"]) .category-badge {
        background-color: var(--sandy-beige-dark);
        color: var(--text-primary);
    }


    p {
        font-size: 0.9rem; /* Slightly smaller description */
        color: var(--text-secondary);
        margin-bottom: 0;
        line-height: 1.5;
        flex-grow: 1; /* Allow description to push content down if needed */
    }
</style>