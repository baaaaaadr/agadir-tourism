<script>
    import PlaceCard from '$lib/components/PlaceCard.svelte';
    import RestaurantCard from '$lib/components/RestaurantCard.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import ErrorMessage from '$lib/components/ErrorMessage.svelte';
    import { navigating } from '$app/stores';

    export let data; // From +page.js

    $: query = data?.query;
    $: results = data?.results;
    $: message = data?.message; // Message if query was empty
    $: pageError = data?.error; // If +page.js returns an error instead of throwing

    $: isLoading = $navigating && $navigating.to?.route.id === '/search';

</script>

<svelte:head>
    <title>Résultats de recherche pour "{query || 'Recherche'}" - Visit Agadir</title>
    <meta name="description" content="Recherchez des lieux et restaurants à Agadir." />
</svelte:head>

<div class="search-page-container">

    {#if query}
        <h1>Résultats pour "{query}"</h1>
    {:else}
         <h1>Recherche</h1>
    {/if}

    <!-- Re-add search bar here? Optional, could refine header interaction later -->
    <!-- <div class="search-bar-again"> ... </div> -->

    {#if isLoading}
        <LoadingSpinner />
    {:else if message}
         <p class="search-message">{message}</p>
    {:else if pageError}
         <ErrorMessage message={pageError} />
    {:else if results && results.length > 0}
        <p>{results.length} résultat(s) trouvé(s).</p>
        <div class="results-grid">
            {#each results as item (item.type + '-' + item.id)}
                {#if item.type === 'place'}
                    <PlaceCard place={item} />
                {:else if item.type === 'restaurant'}
                    <RestaurantCard restaurant={item} />
                {/if}
            {/each}
        </div>
    {:else if query}
         <p class="no-results">Aucun résultat trouvé pour "{query}". Essayez un autre terme.</p>
    {:else}
         <!-- Should ideally not happen if message is handled -->
          <p class="search-message">Effectuez une recherche via l'icône dans l'en-tête.</p>
    {/if}

</div>

<style>
    .search-page-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    h1 {
        color: var(--ocean-blue-dark);
        text-align: center;
        margin-bottom: var(--space-lg);
    }

    /* General message styling */
    p {
        text-align: center;
        color: var(--text-secondary);
        margin-bottom: var(--space-xl);
    }
     .search-message {
         font-style: italic;
     }

    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Responsive grid */
        gap: var(--space-lg);
        margin-top: var(--space-lg);
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

    /* Ensure cards take full width */
    :global(.results-grid .card-link) {
         width: 100%;
    }
</style>