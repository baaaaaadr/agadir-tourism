<script>
    import WeatherWidget from '$lib/components/WeatherWidget.svelte';
    // Assure-toi que le chemin d'importation ci-dessus est correct pour ton projet.
  
    // Définition des raccourcis
    const shortcuts = [
      { href: '/map', label: 'Carte Interactive', icon: '🗺️' },
      { href: '/places', label: 'Sites à Visiter', icon: '🏛️' }, // Assure-toi que '/places' est une page qui liste les lieux ou change le lien
      { href: '/restaurants', label: 'Où Manger', icon: '🍽️' }, // Idem pour '/restaurants'
      { href: '/events', label: 'Événements', icon: '📅' },
      { href: '/transport', label: 'Transport', icon: '🚌' },
      { href: '/contacts', label: 'Infos Utiles', icon: 'ℹ️' } // Pointe vers Contacts pour l'instant
    ];
  </script>
  
  <svelte:head>
    <title>Accueil - Office du Tourisme Agadir</title>
    <meta name="description" content="Votre guide officiel pour découvrir Agadir. Accès rapide à la carte, lieux, restaurants, événements, transport et informations utiles." />
  </svelte:head>
  
  <div class="home-container">
  
    <section class="welcome-section">
      <h1>Bienvenue à Agadir !</h1>
      <p>Votre application pour explorer la ville.</p>
    </section>
  
    <!-- Section Raccourcis (MAINTENANT AVANT LA MÉTÉO) -->
    <section class="shortcuts-section">
      <h2>Accès Rapides</h2>
      <div class="shortcuts-grid">
        {#each shortcuts as shortcut (shortcut.href)}
          <a href={shortcut.href} class="shortcut-button">
            <span class="shortcut-icon">{shortcut.icon}</span>
            <span class="shortcut-label">{shortcut.label}</span>
          </a>
        {/each}
      </div>
    </section>
  
    <!-- Section Météo (MAINTENANT APRÈS LES RACCOURCIS) -->
    <section class="weather-section">
       <!-- On pourrait ajouter un petit titre ici si besoin -->
       <!-- <h3>Météo Actuelle</h3> -->
      <WeatherWidget />
    </section>
  
    <!-- Vous pourrez ajouter d'autres sections ici plus tard si nécessaire -->
  
  </div>
  
  <style>
    .home-container {
      padding-top: 1.5rem;
      padding-bottom: 2rem;
    }
  
    .welcome-section {
      text-align: center;
      margin-bottom: 1.5rem; /* Espacement avant les raccourcis */
    }
  
    .welcome-section h1 {
      color: var(--primary-color, #007bff);
      margin-bottom: 0.5rem;
    }
  
     .welcome-section p {
      color: var(--secondary-color, #555);
      font-size: 1.1rem;
     }
  
    /* Section Raccourcis */
    .shortcuts-section {
      margin-bottom: 2.5rem; /* Espacement avant la météo */
    }
  
    .shortcuts-section h2 {
      text-align: center;
      color: var(--secondary-color, #333);
      margin-bottom: 1.5rem;
      font-size: 1.6rem;
    }
  
    .shortcuts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      max-width: 700px;
      margin: 0 auto;
    }
  
    .shortcut-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem 1rem;
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      text-decoration: none;
      color: var(--primary-color, #007bff);
      text-align: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      min-height: 120px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
  
    .shortcut-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  
    .shortcut-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }
  
    .shortcut-label {
      font-size: 1rem;
      font-weight: 500;
    }
  
    /* Section Météo */
    .weather-section {
      margin-bottom: 2rem; /* Espacement après la météo */
      display: flex;
      justify-content: center;
    }
  
    /* Responsive: Passer à 3 colonnes sur les écrans plus larges */
    @media (min-width: 600px) {
      .shortcuts-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }
       .shortcut-button {
          padding: 2rem 1rem;
          min-height: 140px;
       }
       .shortcut-icon {
          font-size: 3rem;
       }
       .shortcut-label {
          font-size: 1.1rem;
       }
    }
  </style>