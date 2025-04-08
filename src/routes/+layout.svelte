<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SideNav from '$lib/components/SideNav.svelte'; // <-- RÉ-AJOUTÉ
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { isSideNavOpen } from '$lib/stores/navStore'; // <-- RÉ-AJOUTÉ
	import '../app.css';

	import { page } from '$app/stores';
	$: error = $page.error;

</script>

<!-- RÉ-AJOUTÉ : Affiche SideNav si le store est true -->
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
		padding: var(--space-lg) var(--space-md);
		max-width: 1200px;
		margin: var(--space-lg) auto;
		width: 100%;
		box-sizing: border-box;
	}
</style>