<script>
    import PlaceCard from '$lib/components/PlaceCard.svelte';
    import RestaurantCard from '$lib/components/RestaurantCard.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import ErrorMessage from '$lib/components/ErrorMessage.svelte';
    import { navigating } from '$app/stores';
    import { fly } from 'svelte/transition';

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
            {#each results as item, index (item.type + '-' + item.id)}
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
    {:else if query}
         <p class="no-results">Aucun résultat trouvé pour "{query}". Essayez un autre terme.</p>
    {:else}
         <!-- Should ideally not happen if message is handled -->
          <p class="search-message">Effectuez une recherche via l'icône dans l'en-tête.</p>
    {/if}

</div>

<style>
    /* src/routes/search/+page.svelte styles */

    .search-page-container {
        max-width: 1200px; /* Consistent max-width */
        margin: 0 auto;
        padding-bottom: var(--space-xxl); /* Ensure space at bottom */
    }

    h1 {
        color: var(--ocean-blue-dark);
        text-align: center;
        margin-bottom: var(--space-lg);
        margin-top: 0;
    }

    /* General message styling */
    p {
        text-align: center;
        color: var(--text-secondary);
        margin-bottom: var(--space-xl);
    }
    .search-message { /* For 'Please enter search term' */
        font-style: italic;
         margin-top: var(--space-xl);
         padding: var(--space-xl);
         background-color: var(--sandy-beige-light);
         border-radius: var(--radius-md);
         max-width: 600px; /* Limit width */
         margin-left: auto;
         margin-right: auto;
    }

    .results-grid {
        display: grid;
        /* Match grid from places/restaurants pages */
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--space-lg);
        margin-top: var(--space-lg);
    }

    .no-results { /* Style for 'No results found for "query"' */
        text-align: center;
        font-style: italic;
        color: var(--text-secondary);
        margin-top: var(--space-xl);
        padding: var(--space-xl);
        background-color: var(--sandy-beige-light);
        border-radius: var(--radius-md);
        border: 1px dashed var(--sandy-beige-dark); /* Dashed border */
        max-width: 600px; /* Limit width */
        margin-left: auto;
        margin-right: auto;
    }

    /* Ensure cards take full width */
    :global(.results-grid .card-link) {
        width: 100%;
    }

    /* Loading spinner alignment */
    :global(.spinner-container) {
        margin-top: var(--space-xl);
    }

    /* Error message alignment/styling */
    :global(.error-message) {
        margin-top: var(--space-xl);
        max-width: 600px; /* Limit width */
        margin-left: auto;
        margin-right: auto;
    }
</style>