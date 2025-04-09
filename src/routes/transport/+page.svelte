<script>
  // No script needed
</script>

<svelte:head>
  <title>Transport à Agadir - Visit Agadir</title>
  <meta name="description" content="Informations pratiques sur les bus, taxis, location de voiture et navette aéroport à Agadir." />
</svelte:head>

<div class="static-page-container transport-page"> <!-- Add common container class -->
  <h1>Se Déplacer à Agadir</h1>
  <p class="intro-paragraph">Options et conseils pour vos déplacements dans et autour de la ville.</p>

  <section>
    <h2>Bus Locaux</h2>
    <p>Gérés par des compagnies privées (comme Alsa), les bus urbains sont une option économique. Les tarifs varient généralement selon la distance (à partir de ~3-5 MAD).</p>
    <p>Les lignes couvrent la plupart des quartiers, avec des horaires allant approximativement de 6h à 21h. Consultez le site de la compagnie principale pour les lignes et horaires précis.</p>
    <!-- Maybe add link to Alsa Agadir if available -->
  </section>

  <section>
    <h2>Taxis</h2>
    <p>Deux types principaux :</p>
    <ul>
      <li><strong>Petits Taxis (Rouges) :</strong> Pour les trajets <strong>intra-urbains</strong>. Ils utilisent obligatoirement un compteur (<span style="font-style: italic;">demandez son activation</span>). Prise en charge jour/nuit différenciée (~2-3 MAD), avec tarif minimum par course.</li>
      <li><strong>Grands Taxis (Blancs ou autre couleur selon destination) :</strong> Pour les trajets <strong>péri-urbains et inter-urbains</strong> (ex: aéroport, Taghazout, Inezgane). Fonctionnent souvent en mode "collectif" sur des lignes fixes ou peuvent être privatisés. Le prix est à <strong>négocier à l'avance</strong> si privatisé, ou fixe par place si collectif.</li>
    </ul>
    <p><strong>Conseils Taxis :</strong> Ayez de la monnaie. Pour les petits taxis, assurez-vous que le compteur est lancé. Pour les grands taxis, mettez-vous d'accord sur le prix *avant* de monter si vous le privatisez.</p>
  </section>

  <section>
    <h2>Location de Voitures</h2>
    <p>De nombreuses agences internationales (Hertz, Avis, Sixt...) et locales sont présentes à l'aéroport et en ville.</p>
    <p><strong>Tarifs :</strong> Variables selon saison et catégorie (à partir de ~200-300 MAD/jour hors extras). Comparez les offres.</p>
    <p><strong>Conditions :</strong> Permis de conduire valide (international souvent recommandé mais pas toujours obligatoire pour certains permis), âge minimum (souvent 21-25 ans), carte de crédit pour la caution.</p>
    <p><strong>Conduite :</strong> À droite. Ceinture obligatoire. Prudence accrue recommandée, surtout en ville. Attention aux deux-roues et piétons.</p>
  </section>

  <section>
    <h2>Navette Aéroport Al Massira (AGA)</h2>
    <p>Plusieurs options pour rejoindre/quitter l'aéroport (~25 km du centre) :</p>
    <ul>
      <li><strong>Grands Taxis :</strong> Disponibles à la sortie. Tarif réglementé et affiché vers Agadir (~200-250 MAD, sujet à changement). Confirmez avant départ.</li>
      <li><strong>Bus L-AE (Airport Express) :</strong> Option la plus économique (~50 MAD). Gérée par Alsa, relie l'aéroport au centre via Inezgane. Fréquence limitée, vérifiez les horaires sur le site d'Alsa.</li>
       <li><strong>Navettes privées / Hôtels :</strong> Transferts réservables en ligne ou via certains hôtels (souvent payants).</li>
    </ul>
  </section>

   <section>
    <h2>Autres Informations</h2>
    <ul>
      <li><strong>Stationnement :</strong> Souvent payant en centre-ville (horodateurs ou gardiens non officiels). Prévoir ~2-5 MAD/heure.</li>
      <li><strong>Piétons :</strong> Traversez avec prudence, même sur les passages piétons.</li>
       <li><strong>Applications VTC :</strong> Des applications comme Careem ou InDriver peuvent être disponibles, mais leur fonctionnement/réglementation peut varier. Les taxis restent l'option la plus courante.</li>
    </ul>
  </section>

</div>

<style>
   /* Common static page styles */
  .static-page-container {
      max-width: 850px;
      margin: 0 auto;
      padding: var(--space-md) 0 var(--space-xxl);
       line-height: 1.7;
  }
   h1 {
      color: var(--ocean-blue-dark);
      text-align: center;
      margin-bottom: var(--space-lg);
  }
   .intro-paragraph {
      text-align: center;
      color: var(--text-secondary);
      margin-bottom: var(--space-xl);
      font-size: 1.1rem;
  }

  section {
      margin-bottom: var(--space-xl);
       /* Removed background/padding from conseil page style */
  }

  h2 {
      color: var(--ocean-blue);
      margin-top: 0; /* Reset margin top if inside section */
      margin-bottom: var(--space-md);
      font-size: 1.5rem;
      padding-bottom: var(--space-sm);
      border-bottom: 1px solid var(--sandy-beige-dark);
  }

  p {
      margin-bottom: var(--space-md);
      color: var(--text-primary);
  }

   ul {
       margin-left: 0;
       padding-left: var(--space-lg);
       list-style: disc; /* Default list style */
       margin-bottom: var(--space-md);
   }
   li { margin-bottom: var(--space-md); }
   li strong { font-weight: 600; color: var(--text-primary); } /* Bolder list item titles */

   /* Remove potential conflicts */
   .transport-page {}
</style>