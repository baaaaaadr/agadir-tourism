<script>
	// Importe les transitions Svelte
	import { fly, fade } from 'svelte/transition';
	// Importe le store (CORRIGÉ pour utiliser $lib)
	import { isSideNavOpen } from '$lib/stores/navStore';
  
	// Importe les icônes nécessaires
	import {
	  Home, Map as MapIcon, /* Renommé car Map est aussi un composant */
	  MapPin,Coffee, Calendar, Bus, Book, DollarSign, Info as InfoIcon, /* Renommé car Info existe */
	  Phone, Heart, X, Settings, /* Ajout de Settings pour 'Conseils' par exemple */
	  Users, /* Pour 'About' ? */
	  Search /* Si on met la recherche ici plus tard */
	} from 'lucide-svelte';
  
	// Fonction pour fermer le menu en mettant le store à false
	function closeNav() {
	  isSideNavOpen.set(false);
	}
  
	// Définition des éléments du menu (adapter les icônes et labels si besoin)
	// J'ai essayé de deviner les icônes, tu peux les changer
	const navItems = [
	  { path: '/', label: 'Accueil', icon: Home },
	  { path: '/map', label: 'Carte', icon: MapIcon },
	  { path: '/places', label: 'Lieux', icon: MapPin }, // Ajoute si tu as une page liste /places
	  { path: '/restaurants', label: 'Restaurants', icon: Coffee }, // Ajoute si tu as une page liste /restaurants
	  { path: '/events', label: 'Événements', icon: Calendar },
	  { path: '/transport', label: 'Transport', icon: Bus },
	  { path: '/phrasebook', label: 'Phrases Utiles', icon: Book },
	  { path: '/currency', label: 'Monnaie', icon: DollarSign },
	  { path: '/favorites', label: 'Mes Favoris', icon: Heart }, 
	  { path: '/conseils', label: 'Conseils', icon: InfoIcon }, // Ou Settings?
	  { path: '/contacts', label: 'Contacts Utiles', icon: Phone },
	  { path: '/about', label: 'À Propos', icon: Users } // Ou InfoIcon si Conseils prend Settings?
	];
  
	// Ajouter/Retirer des liens selon tes pages réelles
  </script>
  
  <!-- Le composant SideNav n'est rendu que si $isSideNavOpen est true (géré dans +layout.svelte) -->
  <!-- Donc, pas besoin de {#if} ici, mais on garde l'overlay et la nav -->
  
  <!-- Overlay pour fermer en cliquant à côté -->
  <div
	class="overlay"
	on:click={closeNav}
	transition:fade={{ duration: 200 }}
	aria-hidden="true"
  ></div>
  
  <!-- Conteneur du menu latéral -->
  <nav
	class="side-nav"
	transition:fly={{ x: -300, duration: 300, opacity: 1 }}
	aria-label="Menu principal"
  >
	<!-- Entête du menu -->
	<div class="nav-header">
	  <div class="brand">
	    <img src="/assets/images/xplore-agadir-icon.png" alt="Xplore Agadir" class="nav-logo" />
	    <h2>Xplore Agadir</h2>
	  </div>
	  <button class="close-button" on:click={closeNav} aria-label="Fermer le menu">
		<X size={24} />
	  </button>
	</div>
  
	<!-- Liste des liens de navigation -->
	<ul class="nav-links" role="menu">
	  {#each navItems as { path, label, icon: Icon }}
		<li role="none">
		  <!-- Utilise on:click pour fermer le menu APRES la navigation pour mobile -->
		  <a href={path} role="menuitem" on:click={closeNav}>
			<Icon size={20} aria-hidden="true" />
			<span>{label}</span>
		  </a>
		</li>
	  {/each}
	</ul>
  </nav>
  
  
  <style>
	.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* CHANGE THIS Z-INDEX */
  z-index: 1050; /* <-- Increase this value (e.g., from 150) */
}

.side-nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-lg);
  /* CHANGE THIS Z-INDEX */
  z-index: 1100; /* <-- Increase this value (e.g., from 200) */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
  
	.nav-header {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  padding: var(--space-md);
	  background-color: var(--ocean-blue);
	  color: white;
	}

	.brand {
	  display: flex;
	  align-items: center;
	  gap: var(--space-sm);
	}

	.nav-logo {
	  width: 32px;
	  height: 32px;
	  object-fit: contain;
	}

	.nav-header h2 {
	  font-size: 1.25rem;
	  font-weight: 600;
	  margin: 0;
	  color: white;
	}

	.close-button {
	  background: none;
	  border: none;
	  color: white;
	  padding: var(--space-xs);
	  cursor: pointer;
	  transition: opacity var(--transition-fast);
	}

	.close-button:hover {
	  opacity: 0.8;
	}
  
	.nav-links {
	  list-style: none;
	  padding: var(--space-md) 0; /* Espace en haut/bas de la liste */
	  margin: 0;
	  flex-grow: 1; /* Prend l'espace restant */
	  overflow-y: auto; /* Scroll interne si besoin */
	}
  
	.nav-links li a {
	  display: flex;
	  align-items: center;
	  /* Padding vertical et horizontal */
	  padding: var(--space-md) var(--space-lg);
	  color: var(--text-primary); /* Utilise variable */
	  text-decoration: none;
	  transition: background-color var(--transition-normal), color var(--transition-normal);
	  font-weight: 500; /* Texte légèrement plus gras */
	}
  
	.nav-links li a:hover,
	.nav-links li a:focus { /* Ajout focus pour accessibilité */
	  background-color: var(--sandy-beige-light); /* Utilise variable */
	  color: var(--ocean-blue); /* Change couleur texte au survol */
	  outline: none; /* On gère le focus avec le fond */
	}
  
	.nav-links li a span {
	  margin-left: var(--space-md); /* Espace entre icône et texte */
	}
  </style>