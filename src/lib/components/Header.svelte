<script>
	import SideNav from './SideNav.svelte'; // Importe le nouveau composant

	// Chemin vers ton logo dans le dossier static
	const logoUrl = '/assets/images/logo.png'; // Ajuste si ton nom de fichier est différent

	// État pour contrôler l'ouverture du menu latéral
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header>
	<div class="header-content">
		<a href="/" class="logo-link">
			<img src={logoUrl} alt="Logo Visit Agadir" class="logo" />
			<h1>Visit Agadir</h1>
		</a>

		<!-- Le bouton Hamburger -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<button class="menu-button" on:click={toggleMenu} aria-label="Ouvrir le menu">
			<div class="hamburger-icon">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</button>
	</div>
</header>

<!-- Le menu latéral (SideNav) est maintenant contrôlé ici -->
<!-- Il s'affichera par-dessus le contenu quand `isMenuOpen` est true -->
<SideNav isOpen={isMenuOpen} {closeMenu} />

<style>
	header {
		background-color: #0077cc; /* Couleur thème */
		color: white;
		padding: 0.8rem 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: sticky; /* Reste visible en haut */
		top: 0;
		z-index: 900; /* Moins que le sidenav et l'overlay */
		width: 100%;
		box-sizing: border-box; /* Inclut padding dans la largeur */
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.logo-link {
		display: flex;
		align-items: center;
		color: white;
		text-decoration: none;
	}

	.logo {
		height: 40px; /* Ajuste la taille du logo */
		margin-right: 0.8rem;
	}

	h1 {
		font-size: 1.5rem;
		margin: 0;
		white-space: nowrap; /* Empêche le titre de passer à la ligne */
	}

	/* Styles pour le bouton Hamburger */
	.menu-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 10px; /* Zone de clic plus grande */
		display: flex; /* Pour centrer l'icône */
		align-items: center;
		justify-content: center;
		margin-left: 1rem; /* Espace par rapport au logo */
	}

	.hamburger-icon {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 24px;
		height: 18px; /* Ajusté pour 3 barres */
	}

	.hamburger-icon span {
		display: block;
		width: 100%;
		height: 3px; /* Épaisseur des barres */
		background-color: white;
		border-radius: 3px;
		transition: all 0.3s ease-in-out; /* Pour une future animation de fermeture (croix) */
	}



	/* Responsive titre */
	@media (max-width: 400px) {
		h1 {
			font-size: 1.3rem;
		}
	}
</style>