<script>
    import PlaceCard from '$lib/components/PlaceCard.svelte';
    import RestaurantCard from '$lib/components/RestaurantCard.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte'; // Importe le spinner
    import WeatherWidget from '$lib/components/WeatherWidget.svelte';

    // 'data' est automatiquement fournie par la fonction load() dans +page.js
    export let data;

    // Indicateur pour savoir si les données sont en train d'être chargées initialement
    // Note: SvelteKit gère souvent ça avec la navigation, mais on peut l'expliciter
    let loading = !data; // Si data n'existe pas encore, on charge

    // Utilise une déclaration réactive pour mettre à jour les listes quand 'data' arrive
    $: places = data?.places || [];
    $: restaurants = data?.restaurants || [];
    $: loading = !data; // Met à jour 'loading' quand 'data' change

</script>

<svelte:head>
    <title>Accueil - Visit Agadir</title>
    <meta name="description" content="Découvrez les meilleures attractions et restaurants d'Agadir." />
</svelte:head>

<WeatherWidget />

<section>
    <h2>Lieux à découvrir</h2>
    {#if loading}
        <LoadingSpinner />
    {:else if places.length > 0}
        <div class="list-container">
            {#each places as place (place.id)}
                <PlaceCard {place} />
            {/each}
        </div>
        {#if places.length >= 6} <!-- Adapte le nombre si tu changes HOME_PAGE_LIMIT -->
           <p style="text-align: center; margin-top: 1rem;">
               <a href="/map">Voir tous les lieux sur la carte →</a>
           </p>
        {/if}
    {:else}
        <p>Aucun lieu à afficher pour le moment.</p>
    {/if}
</section>

<section style="margin-top: 2rem;">
    <h2>Où manger ?</h2>
     {#if loading}
        <LoadingSpinner />
    {:else if restaurants.length > 0}
        <div class="list-container">
            {#each restaurants as restaurant (restaurant.id)}
                <RestaurantCard {restaurant} />
            {/each}
        </div>
         {#if restaurants.length >= 6} <!-- Adapte le nombre si tu changes HOME_PAGE_LIMIT -->
           <p style="text-align: center; margin-top: 1rem;">
               <a href="/map">Voir tous les restaurants sur la carte →</a>
           </p>
        {/if}
    {:else}
        <p>Aucun restaurant à afficher pour le moment.</p>
    {/if}
</section>

<style>
    h2 {
        color: #333;
        margin-bottom: 1rem;
        border-bottom: 2px solid #0077cc;
        padding-bottom: 0.5rem;
    }
    section + section {
         margin-top: 2.5rem; /* Espace entre les sections */
    }
</style>