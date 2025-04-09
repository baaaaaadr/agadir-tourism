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
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        border-radius: var(--radius-md); /* Use variable */
        overflow: hidden;
        position: relative; /* Needed for absolute positioning of the button */
        background-color: var(--bg-secondary); /* Use variable */
    }
    .card-link:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg); /* Use variable */
    }

    .card {
        /* background-color: #fff; Removed, handled by card-link */
        border-radius: var(--radius-md); /* Use variable */
        box-shadow: var(--shadow-md); /* Use variable */
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    /* --- Favorite Button Styles --- */
    .favorite-button {
        position: absolute;
        top: var(--space-sm); /* 8px */
        right: var(--space-sm); /* 8px */
        background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent white */
        border: none;
        border-radius: var(--radius-full); /* Circle */
        padding: var(--space-xs); /* 4px */
        cursor: pointer;
        z-index: 5; /* Above the image */
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary); /* Icon color when not favorited */
        transition: background-color var(--transition-fast), color var(--transition-fast);
        backdrop-filter: blur(2px); /* Slight blur effect */
    }

    .favorite-button:hover {
        background-color: rgba(255, 255, 255, 0.9);
        color: var(--sunset-orange-dark); /* Orange hover */
    }
    /* --- End Favorite Button Styles --- */


    .card-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }

    .card-content {
        padding: var(--space-md); /* Use variable */
        flex-grow: 1;
    }

    h3 {
        margin-top: 0;
        margin-bottom: var(--space-sm); /* Use variable */
        font-size: 1.2rem;
        color: var(--ocean-blue-dark); /* Use variable */
    }

    .category-badge {
        display: inline-block;
        background-color: var(--sandy-beige-light); /* Use variable */
        color: var(--text-secondary); /* Use variable */
        padding: 0.2em 0.6em;
        border-radius: var(--radius-sm); /* Use variable */
        font-size: 0.8em;
        margin-bottom: var(--space-sm); /* Use variable */
    }

    p {
        font-size: 0.95rem;
        color: var(--text-secondary); /* Use variable */
        margin-bottom: 0;
        line-height: 1.5; /* Slightly tighter line height for card description */
    }
</style>