<script>
	import { Home, Map as MapIcon, Calendar, Bus, Languages, Phone, Coins, Info, LifeBuoy } from 'lucide-svelte';
	// Importe les icônes dont nous avons besoin depuis la bibliothèque


	// Props reçues du composant parent (Header)
	export let isOpen = false; // Indique si le menu est ouvert
	export let closeMenu = () => {}; // Fonction pour fermer le menu

	// Liste des liens de navigation MISE À JOUR avec les composants icônes
	const navLinks = [
    { href: '/', text: 'Accueil', icon: Home },
    { href: '/map', text: 'Carte', icon: MapIcon },
    { href: '/events', text: 'Événements', icon: Calendar },
    { href: '/transport', text: 'Transport', icon: Bus },
    // Peut-être regrouper les infos pratiques ici :
    { href: '/phrasebook', text: 'Phrases', icon: Languages },
    { href: '/currency', text: 'Monnaie', icon: Coins },
    // NOUVELLE LIGNE CI-DESSOUS :
    { href: '/conseils', text: 'Conseils', icon: LifeBuoy },
    // FIN NOUVELLE LIGNE
    { href: '/contacts', text: 'Contacts', icon: Phone },
    // Fin groupe infos
    { href: '/about', text: 'À Propos', icon: Info }
];

	// Ferme le menu quand on clique sur un lien (utile sur mobile)
	function handleLinkClick() {
		closeMenu();
	}
</script>

<!-- Overlay semi-transparent qui apparaît derrière le menu -->
{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="overlay" on:click={closeMenu} />
{/if}

<!-- Le panneau latéral du menu -->
<aside class="sidenav" class:open={isOpen}>
	<div class="sidenav-header">
		<span>Navigation</span>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<button class="close-button" on:click={closeMenu} title="Fermer le menu">×</button>
	</div>
	<nav>
		<ul>
			{#each navLinks as link (link.href)}
				<li>
					<!-- MISE À JOUR ICI pour afficher l'icône -->
					<a href={link.href} on:click={handleLinkClick}>
						<svelte:component this={link.icon} size={20} strokeWidth={2} class="nav-icon" />
						<span>{link.text}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style>
	/* Styles existants (non modifiés ou légèrement ajustés) */
	.sidenav {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 280px;
		max-width: 80%;
		background-color: #fff;
		box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
		transform: translateX(-100%);
		transition: transform 0.3s ease-out;
		z-index: 1000;
		display: flex;
		flex-direction: column;
	}

	.sidenav.open {
		transform: translateX(0);
	}

	.sidenav-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid #eee;
		background-color: #f8f9fa;
	}

	.sidenav-header span {
		font-weight: bold;
		color: #333;
		font-size: 1.1rem;
	}

	.close-button {
		background: none;
		border: none;
		font-size: 2rem;
		color: #888;
		cursor: pointer;
		padding: 0 0.5rem;
		line-height: 1;
	}
	.close-button:hover {
		color: #333;
	}

	nav {
		padding: 1rem 0;
		flex-grow: 1;
		overflow-y: auto;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	/* Style des liens - AJUSTÉ pour l'icône */
	li a {
		display: flex; /* Utilise flexbox pour aligner icône et texte */
		align-items: center; /* Centre verticalement */
		gap: 0.8rem; /* Espace entre icône et texte */
		padding: 0.8rem 1.5rem;
		color: #333;
		text-decoration: none;
		font-size: 1rem;
		transition: background-color 0.2s ease;
		border-bottom: 1px solid #f5f5f5;
	}

	li a:hover {
		background-color: #e9ecef;
	}
	li:last-child a {
		border-bottom: none;
	}

	/* Style spécifique pour l'icône (optionnel, pour ajuster la couleur etc.) */
	.nav-icon {
		/* La couleur est héritée du lien 'a' par défaut (currentColor) */
		/* Vous pourriez forcer une couleur si besoin: color: #555; */
		flex-shrink: 0; /* Empêche l'icône de rétrécir si le texte est long */
	}

	/* Style de l'overlay */
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		opacity: 1;
		transition: opacity 0.3s ease-out;
	}

	.sidenav:not(.open) + .overlay {
		opacity: 0;
		pointer-events: none;
	}
</style>