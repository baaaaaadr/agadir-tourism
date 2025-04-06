<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import ErrorMessage from '$lib/components/ErrorMessage.svelte';
    import '../app.css'; // Importe les styles globaux

    // Importe la fonction 'page' pour accéder aux données du layout ou de la page
    import { page } from '$app/stores';

    // Variable pour stocker une éventuelle erreur globale passée par +layout.js ou +page.js
    $: error = $page.error;

</script>

<div class="app-container">
    <Header />

    <main>
        {#if error}
            <!-- Affiche un message d'erreur s'il y en a un venant du chargement des données -->
            <ErrorMessage message={error.message || 'Une erreur est survenue.'} />
        {:else}
            <!-- Affiche le contenu de la page actuelle -->
            <slot />
        {/if}
    </main>

    <Footer />
</div>

<style>
    .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1; /* Permet au contenu principal de prendre l'espace disponible */
        padding: 1rem;
        max-width: 1200px;
        margin: 1rem auto; /* Centre sur les grands écrans */
        width: 100%;
        box-sizing: border-box;
    }
</style>