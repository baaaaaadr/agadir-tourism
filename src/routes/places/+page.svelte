<script>
    import PlaceCard from '$lib/components/PlaceCard.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { navigating } from '$app/stores'; // Import navigating store
    import { fade, fly } from 'svelte/transition';

    export let data; // Receives data from +page.js
    $: places = data?.places || [];

</script>

<svelte:head>
    <title>Lieux à Visiter - Agadir</title>
    <meta name="description" content="Découvrez les sites touristiques, plages, monuments et autres points d'intérêt à Agadir." />
</svelte:head>

<div class="list-page-container">
    <h1>Lieux à Visiter</h1>

    {#if places.length > 0}
        <p>Explorez les différents points d'intérêt d'Agadir et ses environs.</p>
        <div class="cards-grid">
            {#each places as place, index (place.id)}
                <div in:fade="{{ duration: 500, delay: index * 100 }}">
                    <PlaceCard {place} />
                </div>
            {/each}
        </div>
    {:else if !data || ($navigating && $navigating.to?.route.id === '/places')}
         <!-- Show loading spinner initially or during navigation to this specific page -->
         <!-- Check $navigating.to existence before accessing properties -->
         <LoadingSpinner />
    {:else}
         <!-- Handle case where data is loaded but places array is empty -->
         <p class="no-results">Aucun lieu trouvé pour le moment.</p>
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
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Responsive grid */
        gap: var(--space-lg);
    }

    .no-results {
        text-align: center;
        font-style: italic;
        color: var(--text-secondary);
        margin-top: var(--space-xl);
        padding: var(--space-xl);
        background-color: var(--sandy-beige-light);
        border-radius: var(--radius-md);
    }

    /* Ensure cards take full width within the grid cell */
    :global(.cards-grid .card-link) {
         width: 100%;
    }
</style>