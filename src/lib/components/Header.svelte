<script>
	// Importe les icônes nécessaires depuis lucide-svelte
	import { Menu, Search } from 'lucide-svelte';
	// Importe le store pour gérer l'état du menu latéral
	import { isSideNavOpen } from '$lib/stores/navStore'; // Note: utilisation de $lib
  
	// Fonction pour ouvrir/fermer le menu latéral en modifiant le store
	function toggleNav() {
	  isSideNavOpen.update(value => !value); // Inverse la valeur actuelle (true -> false, false -> true)
	}
  
	// TODO: Implémenter la fonction de recherche quand le bouton sera cliqué
	function handleSearchClick() {
	  console.log("Bouton Recherche cliqué - à implémenter");
	  // Pourrait ouvrir un modal, naviguer vers /search, ou afficher un champ input
	}
  
	// Optionnel: Chemin vers le logo si tu préfères garder une image
	// const logoUrl = '/assets/images/logo.png';
  </script>
  
  <header>
	<div class="header-content">
	  <!-- Bouton Menu (Hamburger) -->
	  <button class="menu-button" on:click={toggleNav} aria-label="Ouvrir ou fermer le menu">
		<Menu size={24} />
	  </button>
  
	  <!-- Logo (Texte) -->
	  <div class="logo">
		<!-- Si tu veux utiliser une image à la place : -->
		<!-- <a href="/" aria-label="Accueil"> -->
		<!--   <img src={logoUrl} alt="Logo Agadir Tourism" class="logo-img" /> -->
		<!-- </a> -->
		 <a href="/" class="logo-link">
		  <h1>Agadir Tourism</h1>
		</a>
	  </div>
  
	  <!-- Bouton Recherche -->
	  <button class="search-button" on:click={handleSearchClick} aria-label="Rechercher">
		<Search size={24} />
	  </button>
	</div>
  </header>
  
  <!-- IMPORTANT: Le composant <SideNav> n'est PLUS ici ! -->
  <!-- Il sera géré dans le fichier layout principal (ex: +layout.svelte) -->
  
  <style>
	header {
	  /* Utilise les nouvelles variables CSS */
	  background-color: var(--ocean-blue);
	  color: white;
	  position: sticky; /* Reste en haut lors du scroll */
	  top: 0;
	  z-index: 100; /* Assure qu'il est au-dessus de la plupart du contenu */
	  box-shadow: var(--shadow-md); /* Ombre définie dans app.css */
	  padding: 0 var(--space-md); /* Espace à gauche/droite seulement */
	}
  
	.header-content {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  /* Hauteur fixe pour le header, ajuster si besoin */
	  height: 60px;
	  /* Limite la largeur sur les grands écrans */
	  max-width: 1200px;
	  margin: 0 auto; /* Centre le contenu */
	}
  
	.logo {
	  /* Prend la place restante pour centrer le logo */
	  flex-grow: 1;
	  text-align: center;
	}
  
	.logo-link {
	  color: white;
	  text-decoration: none;
	  display: inline-block; /* Pour que le lien ne prenne pas toute la largeur */
	}
  
	.logo-link h1 {
	  font-family: var(--font-heading); /* Police définie dans app.css */
	  font-size: 1.5rem; /* 24px */
	  font-weight: 700;
	  margin: 0; /* Supprime marges par défaut du h1 */
	  line-height: 1; /* Ajuste pour un meilleur alignement vertical */
	}
  
	/* Si tu utilises une image logo: */
	/*
	.logo-img {
	  height: 40px; // Ajuster la taille
	  display: block; // Assurer un bon alignement
	}
	*/
  
	.menu-button,
	.search-button {
	  background: transparent;
	  border: none;
	  color: white;
	  cursor: pointer;
	  padding: var(--space-sm); /* Utilise variable d'espacement */
	  border-radius: var(--radius-full); /* Rond */
	  display: flex; /* Pour centrer l'icône */
	  align-items: center;
	  justify-content: center;
	  transition: background-color var(--transition-normal); /* Transition définie dans app.css */
	}
  
	.menu-button:hover,
	.search-button:hover {
	  background-color: rgba(255, 255, 255, 0.1); /* Léger fond au survol */
	}
  
	/* Ajustement pour petits écrans si le titre est trop long */
	@media (max-width: 480px) {
	  .logo-link h1 {
		font-size: 1.25rem; /* 20px */
	  }
	   .header-content {
		  height: 56px; /* Légèrement moins haut sur mobile */
	   }
	   /* Masquer le texte du logo si VRAIMENT nécessaire (préférer réduire la taille) */
	   /*
	   .logo-link h1 span {
		  display: none; // Cache le texte, garde juste une icône si on en met une plus tard
	   }
	   */
	  }
	</style>