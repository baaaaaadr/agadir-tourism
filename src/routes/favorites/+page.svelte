<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { favoritesStore } from '$lib/stores/favoritesStore';
    import { supabase } from '$lib/supabaseClient';
    import PlaceCard from '$lib/components/PlaceCard.svelte';
    import RestaurantCard from '$lib/components/RestaurantCard.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import ErrorMessage from '$lib/components/ErrorMessage.svelte';
    import { fly } from 'svelte/transition';

    let favoriteDetails = [];
    let isLoading = true;
    let error = null;
    let currentFavorites = []; // To hold the list from the store

    // Subscribe to the store to get the list of favorite IDs/types
    favoritesStore.subscribe(value => {
        currentFavorites = value;
        // If in browser, trigger data fetching when favorites change
        // Debounce or check might be needed if updates are too frequent, but likely fine
        if (browser) {
            fetchFavoriteDetails();
        }
    });

    async function fetchFavoriteDetails() {
        if (!currentFavorites || currentFavorites.length === 0) {
            favoriteDetails = [];
            isLoading = false;
            error = null;
            return; // Nothing to fetch
        }

        isLoading = true;
        error = null;

        const placeIds = currentFavorites.filter(f => f.type === 'place').map(f => f.id);
        const restaurantIds = currentFavorites.filter(f => f.type === 'restaurant').map(f => f.id);

        try {
            let places = [];
            let restaurants = [];

            // Fetch places if there are any favorited place IDs
            if (placeIds.length > 0) {
                const { data: placeData, error: placeError } = await supabase
                    .from('places')
                    .select('id, name, description, category, image_url') // Select fields needed by PlaceCard
                    .in('id', placeIds);
                if (placeError) throw placeError;
                places = placeData.map(p => ({ ...p, type: 'place' })) || []; // Add type for sorting/rendering
            }

            // Fetch restaurants if there are any favorited restaurant IDs
            if (restaurantIds.length > 0) {
                 const { data: restaurantData, error: restaurantError } = await supabase
                    .from('restaurants')
                    .select('id, name, description, cuisine_type, price_range, image_url') // Select fields needed by RestaurantCard
                    .in('id', restaurantIds);
                if (restaurantError) throw restaurantError;
                restaurants = restaurantData.map(r => ({ ...r, type: 'restaurant' })) || []; // Add type
            }

            // Combine and potentially sort (e.g., by name or date added from localStorage)
            // For now, just combine
            favoriteDetails = [...places, ...restaurants];
             // Optional: Sort by name
             // favoriteDetails.sort((a, b) => a.name.localeCompare(b.name));

             // Optional: Sort by date added (descending - newest first)
             // Need to retrieve addedAt from currentFavorites
             favoriteDetails.sort((a, b) => {
                const favA = currentFavorites.find(f => f.id === a.id && f.type === a.type);
                const favB = currentFavorites.find(f => f.id === b.id && f.type === b.type);
                return (favB?.addedAt || 0) - (favA?.addedAt || 0);
             });


        } catch (err) {
            console.error("Error fetching favorite details:", err);
            error = `Impossible de charger les détails des favoris: ${err.message}`;
            favoriteDetails = []; // Clear details on error
        } finally {
            isLoading = false;
        }
    }

    // Fetch data when the component mounts on the client
    onMount(() => {
        if (browser) {
             fetchFavoriteDetails();
        } else {
            // Cannot fetch on server as localStorage isn't available
            isLoading = false;
            // error = "Les favoris ne peuvent être chargés que côté client.";
        }
    });

</script>

<svelte:head>
    <title>Mes Favoris - Visit Agadir</title>
    <meta name="description" content="Consultez vos lieux et restaurants préférés à Agadir." />
</svelte:head>

<div class="favorites-page">
    <h1>Mes Favoris</h1>

    {#if isLoading}
        <LoadingSpinner />
    {:else if error}
        <ErrorMessage message={error} />
    {:else if favoriteDetails.length > 0}
         <p>Retrouvez ici les lieux et restaurants que vous avez ajoutés à vos favoris.</p>
        <div class="favorites-grid">
            {#each favoriteDetails as item, index (item.type + '-' + item.id)}
                {#if item.type === 'place'}
                    <div in:fly="{{ y: 20, duration: 300, delay: index * 50 }}">
                        <PlaceCard place={item} />
                    </div>
                {:else if item.type === 'restaurant'}
                    <div in:fly="{{ y: 20, duration: 300, delay: index * 50 }}">
                        <RestaurantCard restaurant={item} />
                    </div>
                {/if}
            {/each}
        </div>
    {:else if currentFavorites.length > 0 && favoriteDetails.length === 0 && !error}
         <!-- Case where favorites exist in localStorage but details haven't loaded yet or failed silently -->
          <LoadingSpinner />
          <p style="text-align: center; margin-top: 1rem;">Chargement des détails...</p>
    {:else}
        <p class="no-favorites">Vous n'avez pas encore ajouté de favoris. Cliquez sur le cœur ❤️ sur une carte de lieu ou de restaurant pour l'ajouter !</p>
    {/if}
</div>

<style>
    .favorites-page {
        max-width: 1200px; /* Match layout max-width */
        margin: 0 auto; /* Center */
    }

    h1 {
        color: var(--ocean-blue-dark);
        text-align: center;
        margin-bottom: var(--space-xl);
    }

    .favorites-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--space-lg);
        margin-top: var(--space-xl);
        transition: opacity 0.3s ease-in-out;
    }

    .no-favorites {
        text-align: center;
        font-style: italic;
        color: var(--text-secondary);
        margin-top: var(--space-xxl);
        padding: var(--space-xl);
        background-color: var(--sandy-beige-light);
        border-radius: var(--radius-md);
        border: 1px dashed var(--sandy-beige-dark);
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        transition: opacity 0.3s ease-in-out;
    }

     /* Ensure cards take full width within the grid cell */
    :global(.favorites-grid .card-link) {
         width: 100%;
    }
</style>