<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import { isSideNavOpen } from '$lib/stores/navStore';
    // --- Theme Imports ---
	import { themeStore, applyTheme } from '$lib/stores/themeStore.js'; // Import store and helper
    // --- End Theme Imports ---
	import '../app.css';

	import { page } from '$app/stores';
	$: error = $page.error;

    // --- Theme Subscription ---
    // Use $: to reactively call applyTheme whenever the store value changes
    $: if ($themeStore) { // Ensure $themeStore is accessed to trigger reactivity
        applyTheme($themeStore);
    }
    // --- End Theme Subscription ---

</script>

<!-- RÃ‰-AJOUTÃ‰ : Affiche SideNav si le store est true -->
{#if $isSideNavOpen}
	<SideNav />
{/if}

<div class="app-container">
	<Header />

	<main>
		{#if error}
			<ErrorMessage message={error.message || 'Une erreur est survenue.'} />
		{:else}
			<slot />
		{/if}
	</main>

	<BottomNav />
	<Footer />
</div>

<style>
	/* Styles existants */
	.app-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
	}

	main {
		flex: 1;
		padding-top: var(--space-lg);
		padding-bottom: var(--space-xl);
		max-width: 1200px;
		margin-left: auto; /* Center content */
        margin-right: auto;
        width: 100%; /* Ensure it takes width for centering */
		box-sizing: border-box;
        padding-left: var(--space-md); /* Add horizontal padding here */
        padding-right: var(--space-md);
	}

	/* Ajuster le padding du footer pour éviter le chevauchement avec le BottomNav */
	footer {
		padding-top: 60px; /* Hauteur approximative du BottomNav */
	}

    /* Ajuster le padding du main sur mobile pour le BottomNav */
    @media (max-width: 767px) {
        main {
            padding-bottom: calc(60px + var(--space-lg) + env(safe-area-inset-bottom));
        }
    }
</style>