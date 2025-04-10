<script>
    import RestaurantCard from '$lib/components/RestaurantCard.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { navigating } from '$app/stores'; // Import navigating store
    import { fade, fly } from 'svelte/transition';

    export let data; // Receives data from +page.js
    $: restaurants = data?.restaurants || [];

</script>

<svelte:head>
    <title>Où Manger - Restaurants à Agadir</title>
    <meta name="description" content="Trouvez les meilleurs restaurants, cafés et snacks à Agadir, pour tous les goûts et budgets." />
</svelte:head>

<div class="list-page-container">
    <h1>Où Manger à Agadir</h1>

    {#if restaurants.length > 0}
        <p>Découvrez une sélection de restaurants pour savourer la cuisine locale et internationale.</p>
        <div class="cards-grid">
            {#each restaurants as restaurant, index (restaurant.id)}
                <div in:fade="{{ duration: 500, delay: index * 100 }}">
                    <RestaurantCard {restaurant} />
                </div>
            {/each}
        </div>
    {:else if !data || ($navigating && $navigating.to?.route.id === '/restaurants')}
        <!-- Show loading spinner initially or during navigation to this specific page -->
        <!-- Check $navigating.to existence before accessing properties -->
        <LoadingSpinner />
    {:else}
        <p class="no-results">Aucun restaurant trouvé pour le moment.</p>
    {/if}

</div>

<style>
    .list-page-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    h1 {
        color: var(--ocean-blue-dark);
        text-align: center;
        margin-bottom: var(--space-lg);
    }

    p {
        text-align: center;
        color: var(--text-secondary);
        margin-bottom: var(--space-xl);
    }

    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--space-lg);
        margin-top: var(--space-lg);
    }

    .no-results {
        text-align: center;
        font-style: italic;
        color: var(--text-secondary);
        margin-top: var(--space-lg);
        padding: var(--space-xl);
        background-color: var(--sandy-beige-light);
        border-radius: var(--radius-md);
    }

    /* Ensure cards take full width within the grid cell */
    :global(.cards-grid .card-link) {
        width: 100%;
    }
</style>