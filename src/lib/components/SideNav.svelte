<script>
	// Props reçues du composant parent (Header)
	export let isOpen = false; // Indique si le menu est ouvert
	export let closeMenu = () => {}; // Fonction pour fermer le menu

	// Liste des liens de navigation
	const navLinks = [
		{ href: '/', text: 'Accueil' },
		{ href: '/map', text: 'Carte' },
		{ href: '/events', text: 'Événements' },
		{ href: '/phrasebook', text: 'Phrases' },
		{ href: '/contacts', text: 'Contacts' },
		{ href: '/currency', text: 'Monnaie' },
		{ href: '/about', text: 'À Propos' }
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
					<a href={link.href} on:click={handleLinkClick}>{link.text}</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style>
	.sidenav {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh; /* Toute la hauteur */
		width: 280px; /* Largeur du menu */
		max-width: 80%; /* Limite sur très petits écrans */
		background-color: #fff;
		box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
		transform: translateX(-100%); /* Caché par défaut sur la gauche */
		transition: transform 0.3s ease-out;
		z-index: 1000; /* Au-dessus de tout sauf peut-être des popups carte */
		display: flex;
		flex-direction: column;
	}

	.sidenav.open {
		transform: translateX(0); /* Visible quand la classe 'open' est ajoutée */
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
		flex-grow: 1; /* Prend l'espace restant */
		overflow-y: auto; /* Ajoute une barre de défilement si trop de liens */
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li a {
		display: block;
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

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5); /* Noir semi-transparent */
		z-index: 999; /* Juste en dessous du menu latéral */
		opacity: 1;
		transition: opacity 0.3s ease-out;
	}

	/* Optionnel: Cacher l'overlay quand le menu n'est pas ouvert (même si le #if le fait déjà) */
	.sidenav:not(.open) + .overlay {
		opacity: 0;
		pointer-events: none; /* Empêche les clics quand caché */
	}
</style>