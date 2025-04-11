<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Map from '$lib/components/Map.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	export let data; // Receives data from +page.js

	// --- State Variables ---
	let allMarkers = []; // Holds the original full list of markers
	let filteredMarkers = []; // Holds the markers to be displayed on the map
	let uniquePlaceCategories = [];
	let uniqueRestaurantCuisines = [];
	let selectedPlaceCategories = []; // Bound to checkboxes
	let selectedRestaurantCuisines = []; // Bound to checkboxes
	let filtersOpen = false; // Filters start closed by default

	// Flags to control initial loading state for filters
	let categoriesDerived = false;
	let cuisinesDerived = false;

	// Map settings (as before)
	let mapCenter = [30.4202, -9.5982];
	let mapZoom = 13;

	// --- Derive Filters and Initialize ---
	// Use a reactive statement to process data once it's available
	$: if (data?.markers && data.markers.length > 0 && !categoriesDerived && !cuisinesDerived) {
		allMarkers = data.markers;

		// Extract unique place categories (handle null/undefined/empty strings)
		const placeCats = new Set(
			allMarkers
				.filter((m) => m.type === 'place' && m.category)
				.map((m) => m.category.trim())
				.filter(Boolean) // Remove empty strings after trimming
		);
		uniquePlaceCategories = [...placeCats].sort();
		selectedPlaceCategories = [...uniquePlaceCategories]; // Select all initially
		categoriesDerived = true; // Mark as derived

		// Extract unique restaurant cuisines (handle null/undefined/empty strings)
		const restaurantCuis = new Set(
			allMarkers
				.filter((m) => m.type === 'restaurant' && m.cuisine)
				.map((m) => m.cuisine.trim())
				.filter(Boolean) // Remove empty strings after trimming
		);
		uniqueRestaurantCuisines = [...restaurantCuis].sort();
		selectedRestaurantCuisines = [...uniqueRestaurantCuisines]; // Select all initially
		cuisinesDerived = true; // Mark as derived

		// Trigger initial filtering calculation
		filterMapMarkers();
		console.log('Filters derived:', { uniquePlaceCategories, uniqueRestaurantCuisines });
	}

	// --- Filtering Logic ---
	// Reactive statement recalculates filteredMarkers whenever selections change
	$: filterMapMarkers(selectedPlaceCategories, selectedRestaurantCuisines, allMarkers);

	function filterMapMarkers() {
		// Ensure allMarkers is populated before filtering
		if (!allMarkers || allMarkers.length === 0) {
			filteredMarkers = [];
			return;
		}

		filteredMarkers = allMarkers.filter((marker) => {
			if (marker.type === 'place') {
				// Include place if its category is selected OR if it has no category (treat uncategorized as always visible when any filter is on)
				return selectedPlaceCategories.includes(marker.category) || !marker.category;
			} else if (marker.type === 'restaurant') {
				// Include restaurant if its cuisine is selected OR if it has no cuisine
				return selectedRestaurantCuisines.includes(marker.cuisine) || !marker.cuisine;
			}
			return false; // Should not happen if type is always place/restaurant
		});
	}

	// Helper functions for Select All/None (Optional but useful)
	function selectAllCategories() {
		selectedPlaceCategories = [...uniquePlaceCategories];
	}
	function selectNoneCategories() {
		selectedPlaceCategories = [];
	}
	function selectAllCuisines() {
		selectedRestaurantCuisines = [...uniqueRestaurantCuisines];
	}
	function selectNoneCuisines() {
		selectedRestaurantCuisines = [];
	}
</script>

<svelte:head>
	<title>Carte Interactive d'Agadir - Visit Agadir</title>
	<meta
		name="description"
		content="Explorez les points d'intérêt et restaurants d'Agadir sur la carte interactive."
	/>
</svelte:head>

<section class="map-page-section">
	<h1>Carte Interactive d'Agadir</h1>
	<p class="intro-text">Découvrez les lieux et restaurants directement sur la carte.</p>

	<!-- Collapsible Filters Section -->
	{#if categoriesDerived || cuisinesDerived}
		<details class="filters-details" bind:open={filtersOpen}>
			<summary class="filters-summary">
				Afficher/Masquer les Filtres
				<span class="filters-toggle-icon">{#if filtersOpen}▲{:else}▼{/if}</span>
			</summary>

			<div class="filters-container">
				<!-- Place Category Filters -->
				{#if uniquePlaceCategories.length > 0}
					<fieldset class="filter-group">
						<legend>Lieux par Catégorie</legend>
						<div class="filter-controls">
							<button on:click={selectAllCategories} class="btn btn-secondary btn-sm">Tout</button>
							<button on:click={selectNoneCategories} class="btn btn-secondary btn-sm">Aucun</button>
						</div>
						<div class="checkbox-list">
							{#each uniquePlaceCategories as category (category)}
								<label>
									<input type="checkbox" bind:group={selectedPlaceCategories} value={category} />
									{category}
								</label>
							{/each}
						</div>
					</fieldset>
				{/if}

				<!-- Restaurant Cuisine Filters -->
				{#if uniqueRestaurantCuisines.length > 0}
					<fieldset class="filter-group">
						<legend>Restaurants par Cuisine</legend>
						<div class="filter-controls">
							<button on:click={selectAllCuisines} class="btn btn-secondary btn-sm">Tout</button>
							<button on:click={selectNoneCuisines} class="btn btn-secondary btn-sm">Aucun</button>
						</div>
						<div class="checkbox-list">
							{#each uniqueRestaurantCuisines as cuisine (cuisine)}
								<label>
									<input type="checkbox" bind:group={selectedRestaurantCuisines} value={cuisine} />
									{cuisine}
								</label>
							{/each}
						</div>
					</fieldset>
				{/if}
			</div>
			<!-- END of filters-container div -->
		</details>
		<!-- End details -->
	{:else if data?.markers}
		<!-- Optional: Show a message if deriving filters hasn't completed but data is there -->
		<!-- <p>Chargement des filtres...</p> -->
	{/if}
	<!-- End Filters Section -->

	<!-- Map Rendering Section -->
	{#if browser}
		<!-- Render map using filteredMarkers -->
		<Map markers={filteredMarkers} center={mapCenter} zoom={mapZoom} mapId="main-map" />

		<!-- Message if filters result in no markers shown -->
		{#if (categoriesDerived || cuisinesDerived) && filteredMarkers.length === 0 && allMarkers.length > 0}
			<p class="no-results-message">
				Aucun marqueur ne correspond aux filtres sélectionnés. Essayez d'élargir votre sélection.
			</p>
		{:else if !data?.markers || allMarkers.length === 0}
			<!-- Message if no markers loaded initially -->
			<p>Aucun point d'intérêt avec coordonnées trouvé à afficher sur la carte.</p>
		{/if}

		<!-- Loading Spinner (Handles initial data load before filters are derived) -->
		{#if !categoriesDerived && !cuisinesDerived && !data?.error}
			<LoadingSpinner />
		{/if}

	{:else}
		<!-- Placeholder during server-side rendering -->
		<div
			style="height: 500px; background: #eee; display: flex; align-items: center; justify-content: center; border-radius: 8px;"
		>
			Carte en cours de chargement...
		</div>
	{/if}
	<!-- End Map Rendering Section -->
</section>

<style>
    /* src/routes/map/+page.svelte styles */

    .map-page-section {
        max-width: 100%; /* Allow section to span width for better map display */
    }

    h1 {
        margin-top: 0;
        color: var(--ocean-blue-dark);
        text-align: center;
        margin-bottom: var(--space-sm);
    }
    p.intro-text { /* Added class for clarity */
        margin-bottom: var(--space-lg);
        color: var(--text-secondary);
        text-align: center;
    }

    /* --- Collapsible Filter Styles --- */
    .filters-details {
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        margin-bottom: var(--space-lg);
        background-color: var(--bg-secondary);
        overflow: hidden;
    }

    .filters-summary {
        padding: var(--space-sm) var(--space-md); /* Adjusted padding */
        cursor: pointer;
        font-weight: 600;
        color: var(--ocean-blue-dark);
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color var(--transition-fast);
        user-select: none;
    }
    .filters-summary:hover {
        background-color: var(--sandy-beige-light);
    }
    .filters-summary::-webkit-details-marker { display: none; }

    .filters-toggle-icon {
        font-size: 0.9em; /* Slightly larger icon */
        display: inline-block;
        margin-left: var(--space-sm);
        transition: transform var(--transition-fast);
        color: var(--text-secondary); /* Color for the icon */
    }
    .filters-details[open] .filters-summary {
         border-bottom: 1px solid var(--border-color); /* Add separator when open */
         background-color: var(--sandy-beige-light); /* Keep hover color when open */
    }
    /* Optional: Rotate icon when open */
    /* .filters-details[open] .filters-toggle-icon { transform: rotate(180deg); } */

    .filters-container {
        padding: var(--space-md) var(--space-lg); /* Use consistent padding */
        /* border-top removed, handled by summary border now */
    }

    .filter-group {
        border: none;
        padding: 0;
        margin: 0 0 var(--space-lg) 0; /* Consistent margin */
    }
    .filter-group:last-child { margin-bottom: 0; }

    .filter-group legend {
        font-size: 1.05rem; /* Slightly smaller legend */
        font-weight: 600;
        color: var(--ocean-blue-dark);
        padding-bottom: var(--space-xs);
        margin-bottom: var(--space-md); /* More space before checkboxes */
        border-bottom: 1px solid var(--sandy-beige-dark);
        width: 100%;
    }

    .filter-controls {
        margin-bottom: var(--space-md);
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-sm);
    }
    /* Ensure buttons use standard classes */
    .filter-controls .btn { /* Apply base button style if not already */
       /* Styles inherited via class names like btn-secondary btn-sm */
    }

    .checkbox-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); /* Adjust min width if needed */
        gap: var(--space-sm) var(--space-md);
        max-height: 200px;
        overflow-y: auto;
        padding: var(--space-xs) var(--space-sm) var(--space-xs) var(--space-xs); /* Padding for scrollbar + visual */
        border: 1px solid var(--sandy-beige-dark); /* Add subtle border to list */
        border-radius: var(--radius-sm);
        background-color: var(--bg-primary); /* Ensure background contrasts */
    }

    .checkbox-list label {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        color: var(--text-primary);
        cursor: pointer;
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: var(--space-xs) 0; /* Add slight vertical padding */
        transition: color var(--transition-fast);
    }
    .checkbox-list label:hover {
        color: var(--ocean-blue);
    }

    .checkbox-list input[type='checkbox'] {
        margin: 0;
        width: 1em;
        height: 1em;
        cursor: pointer;
        accent-color: var(--ocean-blue); /* Theme color for check */
        flex-shrink: 0;
        vertical-align: middle; /* Align better with text */
    }
    /* --- End Filter Styles --- */


    /* --- Map Container Styling --- */
    :global(#main-map.map-container-style) {
        border-radius: var(--radius-md);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-md); /* Slightly stronger shadow */
        margin-top: var(--space-lg);
        /* Height is controlled globally in Map.svelte or its specific global rule */
    }

    /* Message when filters hide all markers */
    .no-results-message {
        text-align: center;
        font-style: italic;
        color: var(--text-secondary);
        margin-top: var(--space-lg);
        padding: var(--space-lg);
        background-color: var(--sandy-beige-light);
        border-radius: var(--radius-md);
        border: 1px dashed var(--sandy-beige-dark); /* Dashed border */
    }

    /* Loading spinner alignment */
    :global(.spinner-container) {
        margin-top: var(--space-xl);
    }

</style>