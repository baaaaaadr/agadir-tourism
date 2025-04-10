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
	<p>Découvrez les lieux et restaurants directement sur la carte.</p>

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
	.map-page-section {
		/* background-color: #fff; */ /* Removed, inherits from layout */
		/* padding: 1.5rem; */ /* Removed, inherits from layout */
		/* border-radius: 8px; */ /* Removed */
		/* box-shadow: 0 2px 10px rgba(0,0,0,0.1); */ /* Removed */
        max-width: 100%; /* Ensure section takes available width */
	}

	h1 {
		margin-top: 0;
		color: var(--ocean-blue-dark); /* Use theme color */
		text-align: center; /* Center title */
		margin-bottom: var(--space-sm); /* Reduce space below H1 */
	}
	p {
		/* Default paragraph for intro text */
		margin-bottom: var(--space-lg); /* More space below intro */
		color: var(--text-secondary); /* Use theme color */
		text-align: center; /* Center intro text */
	}

	/* --- Collapsible Filter Styles --- */
	.filters-details {
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-lg); /* Space below the whole filters section */
		background-color: var(--bg-secondary); /* Light background for the whole block */
        overflow: hidden; /* Ensure children stay within rounded corners */
	}

	.filters-summary {
		padding: var(--space-md);
		cursor: pointer;
		font-weight: 600;
		color: var(--ocean-blue-dark);
		list-style: none; /* Remove default marker/arrow */
		display: flex;
		justify-content: space-between; /* Push icon to the right */
		align-items: center;
		transition: background-color var(--transition-fast);
	}
    .filters-summary:hover {
         background-color: var(--sandy-beige-light); /* Subtle hover on summary */
    }

	/* Remove default marker in Webkit */
	.filters-summary::-webkit-details-marker {
		display: none;
	}

	.filters-toggle-icon {
		font-size: 0.8em;
		display: inline-block;
		margin-left: var(--space-sm);
		transition: transform var(--transition-fast);
	}
    /* Rotate icon when open (optional) */
	/* .filters-details[open] .filters-toggle-icon {
        transform: rotate(180deg);
    } */

	/* Style for the container *inside* details */
	.filters-container {
		padding: var(--space-lg); /* Add padding when open */
		border-top: 1px solid var(--border-color); /* Separator line */
        /* margin-bottom: 0; REMOVED - padding is enough */
	}

    /* Remove outer border/padding from groups inside */
	.filters-details .filter-group {
		border: none;
		padding: 0;
		margin-bottom: var(--space-lg); /* Space between filter groups */
	}
    .filters-details .filter-group:last-child {
        margin-bottom: 0; /* No margin on last group inside */
    }

	.filter-group legend {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--ocean-blue-dark);
		padding-bottom: var(--space-xs); /* Space below legend */
        margin-bottom: var(--space-sm); /* More space before checkboxes */
        border-bottom: 1px solid var(--sandy-beige-dark); /* Underline legend */
        width: 100%; /* Make underline span full width */
	}

	.filter-controls {
		margin-bottom: var(--space-md); /* Space below buttons */
		display: flex;
        flex-wrap: wrap; /* Allow buttons to wrap */
		gap: var(--space-sm);
	}

	.checkbox-list {
		display: grid;
		/* Responsive columns for checkboxes */
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: var(--space-sm) var(--space-md); /* Row and column gap */
        max-height: 200px; /* Limit height and allow scroll if many items */
        overflow-y: auto;
        padding-right: var(--space-sm); /* Padding for scrollbar */
	}

	.checkbox-list label {
		display: flex;
		align-items: center;
		gap: var(--space-sm); /* Increased gap */
		color: var(--text-primary);
		cursor: pointer;
        font-size: 0.9rem; /* Slightly smaller text */
        white-space: nowrap; /* Prevent text wrapping */
        overflow: hidden; /* Hide overflow */
        text-overflow: ellipsis; /* Add ellipsis if text too long */
	}
     .checkbox-list label:hover {
         color: var(--ocean-blue); /* Highlight on hover */
     }

	.checkbox-list input[type='checkbox'] {
		margin: 0;
        width: 1em; /* Consistent size */
        height: 1em;
        cursor: pointer;
        accent-color: var(--ocean-blue); /* Color the checkmark */
        flex-shrink: 0; /* Prevent checkbox shrinking */
	}
    /* --- End Filter Styles --- */


	/* --- Map Container Styling --- */
	/* Target the Map component specifically using its mapId prop if needed,
       or style the container generated by Leaflet more globally */
	:global(#main-map.map-container-style) {
		/* Ensure height is defined via the global rules in Map.svelte or here */
		/* height: 500px; */ /* Already defined in Map.svelte global rule */
		border-radius: var(--radius-md);
		border: 1px solid var(--border-color);
        box-shadow: var(--shadow-sm);
        margin-top: var(--space-lg); /* Space between filters/title and map */
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
    }

</style>