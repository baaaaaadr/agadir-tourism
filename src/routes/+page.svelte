<script>
  import WeatherWidget from '$lib/components/WeatherWidget.svelte';
  // Import the chosen Lucide icons
  import { Map, Landmark, UtensilsCrossed, CalendarDays, Bus, Info } from 'lucide-svelte';

  // We still have access to 'data' from +page.js if we want to use places/restaurants later
  export let data;

  // Update shortcuts array to use the imported icon components
  const shortcuts = [
    { href: '/map', label: 'Carte Interactive', icon: Map }, // Use component
    { href: '/places', label: 'Sites à Visiter', icon: Landmark }, // Use component
    { href: '/restaurants', label: 'Où Manger', icon: UtensilsCrossed }, // Use component
    { href: '/events', label: 'Événements', icon: CalendarDays }, // Use component
    { href: '/transport', label: 'Transport', icon: Bus }, // Use component
    { href: '/contacts', label: 'Infos Utiles', icon: Info } // Use component
  ];

  // Placeholder for hero image - replace with a real image path later
  const heroImageUrl = '/assets/images/default-placeholder.jpg'; // <- CHANGE THIS PATH

</script>

<svelte:head>
  <title>Accueil - Visit Agadir PWA</title> <!-- Updated Title slightly -->
  <meta name="description" content="Votre guide pour découvrir Agadir. Carte, lieux, restaurants, événements, transport et infos utiles." />
</svelte:head>

<div class="home-container">

  <!-- Section Hero -->
  <section class="hero-section">
      <img src={heroImageUrl} alt="Paysage d'Agadir" class="hero-image" />
      <div class="hero-text">
          <h1>Bienvenue à Agadir !</h1>
          <p>Votre application pour explorer la perle du Souss.</p>
          <a href="/map" class="btn btn-accent btn-lg" style="margin-top: var(--space-md);">Explorer la Carte</a>
      </div>
  </section>

  <!-- Section Raccourcis (Improved Styling) -->
  <section class="shortcuts-section">
    <h2>Accès Rapides</h2>
    <div class="shortcuts-grid">
      {#each shortcuts as shortcut (shortcut.href)}
        <a href={shortcut.href} class="shortcut-card">
          <div class="shortcut-icon">
            <svelte:component this={shortcut.icon} size={40} strokeWidth={1.5} />
          </div>
          <!-- If using Lucide: <svelte:component this={shortcut.icon} size={40} stroke-width={1.5} /> -->
          <span class="shortcut-label">{shortcut.label}</span>
        </a>
      {/each}
    </div>
  </section>

  <!-- Section Météo -->
  <section class="weather-section">
     <!-- Title is inside the widget -->
    <WeatherWidget />
  </section>

  <!-- Potential Future Section: Featured Places/Restaurants -->
  <!-- {#if data?.places && data.places.length > 0}
      <section class="featured-section">
          <h2>Quelques Suggestions</h2>
          <div class="featured-grid">
              {#each data.places.slice(0, 3) as place} <!- Show first 3 ->
                  <PlaceCard {place} />
              {/each}
          </div>
      </section>
  {/if} -->

</div>

<style>
  .home-container {
    /* padding-top removed, handled by hero margin/padding */
    padding-bottom: var(--space-xxl); /* More space at the bottom */
  }

  /* --- Hero Section --- */
  .hero-section {
      position: relative; /* For text overlay */
      margin-bottom: var(--space-xxl); /* Space below hero */
      border-radius: var(--radius-lg); /* Rounded corners */
      overflow: hidden; /* Keep image inside rounded corners */
      box-shadow: var(--shadow-md);
      min-height: 250px; /* Minimum height */
      display: flex; /* Use flex for text alignment */
      align-items: center; /* Center text vertically */
      justify-content: center; /* Center text horizontally */
  }

  .hero-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
      filter: brightness(0.6) contrast(1) saturate(1.1);
  }

  .hero-text {
      position: relative; /* Above the image */
      z-index: 2;
      color: white;
      text-align: center;
      padding: var(--space-lg);
  }

  .hero-text h1 {
      font-size: 2.5rem;
      margin-bottom: var(--space-sm);
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  }

  .hero-text p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--space-lg);
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  }

  /* Adjust hero size on larger screens */
  @media (min-width: 768px) {
      .hero-section {
          min-height: 350px;
      }
      .hero-text h1 {
          font-size: 3rem;
      }
       .hero-text p {
          font-size: 1.3rem;
       }
  }

  /* --- Shortcuts Section --- */
  .shortcuts-section {
    margin-bottom: var(--space-xxl);
  }

  .shortcuts-section h2 {
    text-align: center;
    color: var(--ocean-blue-dark);
    margin-bottom: var(--space-xl); /* More space below title */
    font-size: 1.8rem; /* Slightly larger title */
  }

  .shortcuts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
    padding: 0 var(--space-md);
    max-width: 900px;
    margin: 0 auto;
  }

  /* Style the shortcut links as cards */
  .shortcut-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-lg);
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-primary);
    text-align: center;
    transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
    min-height: 150px;
    box-shadow: var(--shadow-sm);
  }

  .shortcut-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--ocean-blue-light);
    background-color: var(--sandy-beige-light);
  }

  .shortcut-icon {
    margin-bottom: var(--space-md);
    color: var(--ocean-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform var(--transition-normal);
  }

  .shortcut-card:hover .shortcut-icon {
    transform: scale(1.1);
  }

  .shortcut-label {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--ocean-blue-dark);
  }

  /* Responsive: 3 columns on medium screens and up */
  @media (min-width: 600px) {
    .shortcuts-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
   /* Responsive: Wider gap on large screens */
  @media (min-width: 900px) {
       .shortcuts-grid {
           gap: var(--space-xl); /* 32px gap */
       }
  }


  /* --- Weather Section --- */
  .weather-section {
    margin-bottom: var(--space-xxl);
    /* Center the widget if its container doesn't */
     max-width: 400px; /* Limit width of weather widget if needed */
     margin-left: auto;
     margin-right: auto;
  }

  /* --- Optional Featured Section --- */
  /* .featured-section { margin-bottom: var(--space-xxl); }
  .featured-section h2 { text-align: center; color: var(--ocean-blue-dark); margin-bottom: var(--space-xl); font-size: 1.8rem; }
  .featured-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-lg); max-width: 1200px; margin: 0 auto; }
  :global(.featured-grid .card-link) { width: 100%; } */

</style>