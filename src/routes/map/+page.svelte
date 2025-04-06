<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import Map from '$lib/components/Map.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

    export let data; // Reçoit les données de +page.js
    $: markers = data?.markers || [];

    // Centre initial de la carte (Agadir)
    let mapCenter = [30.4202, -9.5982];
    let mapZoom = 13; // Zoom un peu plus large pour voir plusieurs marqueurs

</script>

<svelte:head>
    <title>Carte d'Agadir - Visit Agadir</title>
    <meta name="description" content="Explorez les points d'intérêt et restaurants d'Agadir sur la carte interactive." />
</svelte:head>

<section class="map-page-section">
    <h1>Carte Interactive d'Agadir</h1>
    <p>Découvrez les lieux et restaurants directement sur la carte.</p>

    {#if browser}
        {#if markers.length > 0}
            <Map markers={markers} center={mapCenter} zoom={mapZoom} mapId="main-map" />
        {:else if data}
             <!-- Si data est chargé mais markers est vide -->
             <p>Aucun point d'intérêt avec coordonnées trouvé à afficher sur la carte.</p>
        {:else}
             <!-- Si data n'est pas encore chargé (initialement) -->
            <LoadingSpinner />
        {/if}
    {:else}
        <!-- Placeholder pendant le rendu serveur -->
         <div style="height: 500px; background: #eee; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
             Carte en cours de chargement...
         </div>
    {/if}

</section>

<style>
    .map-page-section {
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h1 {
        margin-top: 0;
        color: #0077cc;
    }
    p {
        margin-bottom: 1.5rem;
        color: #555;
    }

    /* Assure-toi que le composant Map a une hauteur définie */
    /* Le style est peut-être DANS le composant Map.svelte, sinon ajoute-le ici */
     /* :global(.leaflet-container) {
         height: 500px;
         border-radius: 8px;
         border: 1px solid #ccc;
     } */
</style>