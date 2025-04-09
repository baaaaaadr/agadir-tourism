<script>
    // Pas de logique JavaScript nécessaire pour cette page statique pour le moment
  </script>
  
  <svelte:head>
    <title>Transport à Agadir - Office du Tourisme</title>
    <meta name="description" content="Informations pratiques sur les bus, taxis, location de voiture et navette aéroport à Agadir." />
  </svelte:head>
  
  <div class="transport-container">
    <h1>Se déplacer à Agadir</h1>
  
    <section>
      <h2>Bus Locaux</h2>
      <p><strong>Compagnies :</strong> Les bus locaux à Agadir sont principalement gérés par des compagnies privées. Les tarifs sont généralement abordables, variant entre 5 et 20 MAD (dirhams marocains) selon la distance.</p>
      <p><strong>Lignes et Horaires :</strong> Les lignes de bus couvrent la plupart des quartiers d'Agadir, avec des fréquences régulières. Ils circulent généralement entre 6h00 et 20h00.</p>
    </section>
  
    <section>
      <h2>Taxis</h2>
      <p><strong>Types :</strong> Il y a deux types principaux de taxis :</p>
      <ul>
        <li><strong>Petits Taxis (Rouges) :</strong> Pour les trajets à l'intérieur de la ville. Ils utilisent un compteur (demandez à ce qu'il soit activé). La prise en charge est d'environ 2 MAD le jour et 3 MAD la nuit, avec un tarif minimum par course.</li>
        <li><strong>Grands Taxis (Blancs) :</strong> Pour les trajets plus longs, y compris vers les banlieues ou d'autres villes. Ils n'ont souvent pas de compteur et le prix doit être négocié à l'avance ou partagé avec d'autres passagers sur une ligne fixe.</li>
      </ul>
      <p><strong>Tarifs Indicatifs (Petits Taxis) :</strong> Les tarifs commencent généralement à environ 10 MAD pour les petits trajets en ville. Les courses plus longues peuvent coûter entre 20 et 50 MAD.</p>
      <p><strong>Disponibilité :</strong> Vous pouvez héler un petit taxi dans la rue s'il est libre (lumière sur le toit éteinte) ou les trouver aux stations de taxis.</p>
      <p><strong>Numéros Utiles :</strong> Il n'y a pas de centrale d'appel unique comme dans d'autres pays. Le plus simple est de les héler ou de demander à votre hôtel d'en appeler un.</p>
    </section>
  
    <section>
      <h2>Location de Voitures</h2>
      <p><strong>Agences :</strong> Plusieurs agences internationales (Europcar, Hertz, Sixt, Avis...) et locales sont présentes, notamment à l'aéroport Al Massira (AGA) et en ville.</p>
      <p><strong>Tarifs :</strong> Comptez environ 200 à 400 MAD par jour pour une voiture économique, hors assurance complémentaire et carburant. Les tarifs peuvent être plus élevés en haute saison.</p>
      <p><strong>Conditions :</strong> Permis de conduire international recommandé mais le permis national est souvent accepté (vérifier avec l'agence). Âge minimum requis (souvent 21 ou 25 ans) et carte de crédit pour la caution.</p>
    </section>
  
    <section>
      <h2>Navette Aéroport Al Massira (AGA)</h2>
      <p><strong>Options :</strong></p>
      <ul>
        <li><strong>Grands Taxis :</strong> Disponibles à la sortie du terminal. Le tarif est réglementé et affiché, généralement autour de 200-250 MAD pour le centre-ville d'Agadir. Confirmez le prix avant de monter.</li>
        <li><strong>Bus :</strong> La ligne L-AE (Airport Express) relie l'aéroport au centre-ville (passage par Inezgane). C'est l'option la plus économique (environ 50 MAD) mais moins fréquente et potentiellement plus longue que le taxi. Vérifiez les horaires à l'avance.</li>
         <li><strong>Navettes privées / Hôtels :</strong> Certains hôtels proposent leur propre service de navette (souvent payant). Des services de transfert privés peuvent aussi être réservés en ligne à l'avance.</li>
      </ul>
       <p><strong>Tarifs Navette / Taxi :</strong> Comptez entre 200 et 300 MAD pour un taxi ou une navette privée standard.</p>
    </section>
  
    <section>
      <h2>Autres Informations Utiles</h2>
      <p><strong>Stationnement :</strong> Le stationnement en centre-ville est souvent payant (parcmètres ou gardiens). Tarifs : environ 5 à 10 MAD par heure ou un forfait pour quelques heures/la journée.</p>
      <p><strong>Règles de la Route :</strong> Conduite à droite. La ceinture de sécurité est obligatoire. Attention aux limitations de vitesse et aux contrôles fréquents. La priorité à droite est courante dans les ronds-points non signalisés.</p>
       <p><strong>Piétons :</strong> Soyez vigilant, la traversée des routes peut nécessiter de la prudence.</p>
    </section>
  
  </div>
  
  <style>
    .transport-container {
      padding: 1rem; /* Utilise la variable si définie globalement */
      /* max-width: 800px; */ /* Optionnel: Limiter la largeur sur grand écran */
      /* margin: 0 auto; */ /* Optionnel: Centrer le contenu */
    }
  
    h1 {
      color: var(--primary-color, #007bff); /* Utilise la variable ou une couleur par défaut */
      margin-bottom: 1.5rem;
      text-align: center;
    }
  
    h2 {
      color: var(--secondary-color, #555);
      margin-top: 2rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.5rem;
    }
  
    section {
      margin-bottom: 1.5rem;
    }
  
    p, ul {
      line-height: 1.6;
      margin-bottom: 1rem;
    }
  
    ul {
      list-style: disc;
      padding-left: 2rem; /* Indentation pour les listes */
    }
  
    li {
      margin-bottom: 0.5rem;
    }
  
    strong {
      font-weight: bold;
    }
  
  </style>