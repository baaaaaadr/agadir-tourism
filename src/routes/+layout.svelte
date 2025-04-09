<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
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
		/* padding: var(--space-lg) var(--space-md); - Padding now applied via .static-page-container or component-specific */
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
     /* Optional: Ensure container takes full width */
     /* @media (min-width: 1200px) {
        main {
             padding-left: 0;
             padding-right: 0;
        }
     } */
</style>