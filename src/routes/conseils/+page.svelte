<script>
  // No script needed
</script>

<svelte:head>
  <title>Conseils aux Voyageurs - Agadir</title>
  <meta name="description" content="Conseils pratiques pour votre séjour à Agadir : sécurité, santé, pourboires, marchandage, culture locale et plus." />
</svelte:head>

<div class="static-page-container conseils-page"> <!-- Add common container class -->
  <h1>Conseils aux Voyageurs</h1>
  <p class="intro-paragraph">Quelques recommandations pour profiter pleinement et sereinement de votre séjour à Agadir.</p>

  <section>
    <h2><span class="icon">🛡️</span> Sécurité Générale</h2>
    <ul>
      <li>Agadir est généralement une ville sûre, mais comme partout, restez vigilant, surtout dans les zones très fréquentées (souks, plages).</li>
      <li>Gardez un œil sur vos effets personnels (sacs, téléphones, appareils photo). Évitez d'exhiber des objets de valeur de manière ostentatoire.</li>
      <li>Utilisez les coffres-forts des hôtels pour vos documents importants (passeports) et grosses sommes d'argent. Gardez une copie de vos papiers sur vous ou en ligne.</li>
      <li>Le soir, privilégiez les rues bien éclairées et animées. Si vous sortez tard, prenez un taxi officiel.</li>
      <li>Numéros d'urgence : Police (19), Pompiers/Ambulance (15). Voir la page <a href="/contacts">Contacts</a> pour plus de détails.</li>
    </ul>
  </section>

  <section>
    <h2><span class="icon">💧</span> Santé et Hygiène</h2>
    <ul>
      <li>Buvez de préférence de l'eau en bouteille capsulée, facilement disponible partout. Évitez l'eau du robinet pour la boisson.</li>
      <li>Lavez-vous fréquemment les mains, surtout avant de manger.</li>
      <li>Soyez prudent avec les aliments crus ou peu cuits achetés dans la rue si vous avez un estomac sensible. Privilégiez les restaurants et stands qui semblent propres et fréquentés.</li>
      <li>Protégez-vous du soleil : crème solaire à indice élevé, chapeau, lunettes de soleil, surtout entre 11h et 16h. Hydratez-vous bien.</li>
      <li>Une petite trousse à pharmacie de base (pansements, désinfectant, anti-douleurs, anti-diarrhéique) peut être utile. Des pharmacies (reconnaissables à leur croix verte) sont nombreuses en ville.</li>
    </ul>
  </section>

  <section>
    <h2><span class="icon">💰</span> Argent et Pourboires</h2>
    <ul>
      <li>La monnaie est le Dirham Marocain (MAD). Voir la page <a href="/currency">Monnaie</a> pour les détails et le convertisseur.</li>
      <li>Le pourboire ("bakchich") fait partie de la culture locale pour les petits services rendus. Il n'est pas obligatoire mais apprécié.</li>
      <li>Quelques indications (variables) : 1-2 Dh pour un gardien de parking, 5-10 Dh pour un bagagiste à l'hôtel, 5-10% de la note dans les restaurants si le service n'est pas inclus. Pour les guides, cela dépend de la durée et de la qualité (demandez conseil si besoin).</li>
      <li>Ayez toujours un peu de monnaie (pièces et petits billets) sur vous pour ces occasions.</li>
    </ul>
  </section>

  <section>
    <h2><span class="icon">🤝</span> Marchandage et Achats</h2>
    <ul>
      <li>Le marchandage est courant dans les souks et certains petits magasins d'artisanat, mais pas dans les magasins modernes à prix fixes, les supermarchés ou la plupart des restaurants.</li>
      <li>Considérez-le comme un jeu social plutôt qu'une confrontation. Gardez le sourire !</li>
      <li>Ayez une idée du prix que vous êtes prêt à payer avant de commencer. Le premier prix annoncé est souvent une base de négociation.</li>
      <li>Si vous n'êtes pas intéressé, un "La, shukran" (Non, merci) poli suffit généralement.</li>
      <li>Ne vous sentez jamais obligé d'acheter après avoir négocié.</li>
    </ul>
  </section>

   <section>
    <h2><span class="icon">📸</span> Photos et Respect Culturel</h2>
    <ul>
      <li>Demandez toujours la permission avant de prendre des personnes en photo, en particulier les femmes et les enfants. Certains peuvent refuser ou demander une petite rétribution (surtout les artistes de rue, porteurs d'eau, etc.).</li>
      <li>Habillez-vous de manière respectueuse, surtout si vous visitez des zones moins touristiques ou des lieux religieux (quand la visite est autorisée aux non-musulmans, ce qui est rare pour l'intérieur des mosquées au Maroc, sauf exceptions comme la Mosquée Hassan II à Casablanca). Pour Agadir, une tenue de plage est normale sur le front de mer, mais une tenue plus couvrante (épaules et genoux couverts) est appréciée en ville ou dans les villages alentour.</li>
      <li>Pendant le mois de Ramadan, soyez discret si vous mangez, buvez ou fumez en public pendant les heures de jeûne.</li>
      <li>Apprendre quelques mots de base en Darija (voir <a href="/phrasebook">Guide de Conversation</a>) sera très apprécié.</li>
    </ul>
  </section>

   <section>
    <h2><span class="icon">🔌</span> Divers</h2>
    <ul>
      <li>Le courant électrique est de 220V, les prises sont de type européen (Type C/E). Apportez un adaptateur si nécessaire.</li>
      <li>Le week-end au Maroc est le samedi et le dimanche. Les administrations sont souvent fermées.</li>
      <li>La langue officielle est l'Arabe et l'Amazigh. Le Français est très répandu dans le tourisme et les affaires. L'Anglais est de plus en plus parlé dans les zones touristiques.</li>
      <li>Profitez de l'hospitalité marocaine, elle est légendaire !</li>
    </ul>
  </section>

  <p class="important-note">
    Ces conseils sont généraux. N'hésitez pas à demander plus d'informations à votre hôtel ou à l'Office du Tourisme. Excellent séjour à Agadir !
  </p>

</div>

<style>
  /* Common static page styles */
  .static-page-container {
      max-width: 850px;
      margin: 0 auto;
      padding: var(--space-md) 0 var(--space-xxl);
      line-height: 1.7; /* Base line height */
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
      margin-bottom: var(--space-xl); /* More space between sections */
      padding: var(--space-lg); /* Add padding inside sections */
      background-color: var(--bg-secondary); /* Light background for sections */
      border-radius: var(--radius-md);
      border: 1px solid var(--sandy-beige-light); /* Lighter border */
  }

  h2 {
      color: var(--ocean-blue);
      margin-top: 0;
      margin-bottom: var(--space-md);
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding-bottom: var(--space-sm);
      border-bottom: 1px solid var(--sandy-beige-dark);
  }

  h2 .icon {
     font-size: 1.3em;
     line-height: 1; /* Adjust icon vertical alignment */
  }

  p { /* Default paragraph style inside sections */
    margin-bottom: var(--space-md);
    color: var(--text-primary);
  }

  ul {
    margin-left: 0;
    padding-left: var(--space-lg); /* Indent list items */
    list-style: disc;
    margin-bottom: var(--space-sm); /* Reduce margin below list */
    color: var(--text-primary); /* Ensure list text color */
  }

  li {
    margin-bottom: var(--space-md); /* Space between list items */
  }

   li a {
     color: var(--ocean-blue); /* Use theme link color */
     font-weight: 500;
   }
   li a:hover {
     color: var(--ocean-blue-dark);
     text-decoration: underline;
   }

  .important-note {
    margin-top: var(--space-xl);
    font-size: 0.9em;
    color: var(--text-secondary);
    background-color: var(--sandy-beige-light);
    border-left: 4px solid var(--ocean-blue); /* Use theme accent color */
    padding: var(--space-md);
    border-radius: var(--radius-sm);
    text-align: left; /* Align text left */
  }

   /* Remove potential conflicts from old styles */
   .conseils-page { }
</style>