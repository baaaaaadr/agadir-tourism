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
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let installPromptEvent = null;
	let showInstallButton = false;

	$: error = $page.error;

    // --- Theme Subscription ---
    // Use $: to reactively call applyTheme whenever the store value changes
    $: if ($themeStore) { // Ensure $themeStore is accessed to trigger reactivity
        applyTheme($themeStore);
    }
    // --- End Theme Subscription ---

	onMount(() => {
		if (browser) {
			window.addEventListener('beforeinstallprompt', (event) => {
				event.preventDefault();
				installPromptEvent = event;
				showInstallButton = true;
				console.log('\'beforeinstallprompt\' event captured.');
			});

			window.addEventListener('appinstalled', () => {
				showInstallButton = false;
				installPromptEvent = null;
				console.log('PWA was installed');
			});
		}
	});

	async function handleInstallClick() {
		if (!installPromptEvent) {
			console.log('Install prompt event not available.');
			return;
		}
		try {
			installPromptEvent.prompt();
			const { outcome } = await installPromptEvent.userChoice;
			console.log(`User response to the install prompt: ${outcome}`);
			installPromptEvent = null;
			showInstallButton = false;
		} catch (error) {
			console.error('Error showing install prompt:', error);
			installPromptEvent = null;
			showInstallButton = false;
		}
	}
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

	<BottomNav />
	<Footer showInstallButton={showInstallButton} handleInstallClick={handleInstallClick} />
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