<script>
    // No script needed
</script>

<svelte:head>
    <title>Contacts d'Urgence - Visit Agadir</title>
    <meta name="description" content="Numéros de téléphone importants et contacts d'urgence à Agadir." />
</svelte:head>

<div class="static-page-container contacts-page"> <!-- Add common container class -->
    <h1>Contacts d'Urgence à Agadir</h1>
    <p class="intro-paragraph">Voici quelques numéros utiles en cas de besoin pendant votre séjour.</p>

    <ul class="contacts-list">
        <li>
            <span class="contact-name">Police (Sûreté Nationale)</span>
            <span class="contact-number">
                <a href="tel:19" title="Appeler la Police">19</a>
            </span>
        </li>
         <li>
            <span class="contact-name">Gendarmerie Royale (Hors zone urbaine)</span>
            <span class="contact-number">
                <a href="tel:177" title="Appeler la Gendarmerie">177</a>
            </span>
        </li>
        <li>
            <span class="contact-name">Pompiers (Protection Civile)</span>
            <span class="contact-number">
                <a href="tel:15" title="Appeler les Pompiers">15</a>
            </span>
        </li>
         <li>
            <span class="contact-name">Ambulance / SAMU</span>
            <span class="contact-number">
                 <a href="tel:150" title="Appeler une Ambulance">150</a>
            </span>
        </li>
         <li>
            <span class="contact-name">Police Touristique Agadir</span>
            <span class="contact-number">
                <a href="tel:+212528840912" title="Appeler la Police Touristique">05 28 84 09 12</a>
                 <span class="note">(Numéro exemple, à vérifier)</span>
            </span>
        </li>
         <li>
            <span class="contact-name">Renseignements Téléphoniques</span>
            <span class="contact-number">
                <a href="tel:160" title="Appeler les Renseignements">160</a>
            </span>
        </li>
        <!-- Add more contacts if needed -->
    </ul>

    <p class="important-note">
        <strong>Note :</strong> Pour appeler depuis un numéro étranger, composez l'indicatif du Maroc (+212) et supprimez le premier '0' du numéro local (si applicable). Vérifiez toujours ces numéros auprès de sources officielles car ils peuvent changer.
    </p>
</div>

<style>
    /* Common static page styles */
    .static-page-container {
        max-width: 800px; /* Slightly narrower for contacts */
        margin: 0 auto;
        padding: var(--space-md) 0 var(--space-xxl);
    }

    h1 {
        color: var(--sunset-orange-dark); /* Use accent color for urgency */
        text-align: center;
        margin-bottom: var(--space-lg);
        border-bottom: 2px solid var(--sunset-orange); /* Accent border */
        padding-bottom: var(--space-sm);
    }

     .intro-paragraph {
        text-align: center;
        color: var(--text-secondary);
        margin-bottom: var(--space-xl);
    }

    .contacts-list {
        list-style: none;
        padding: 0;
        margin: var(--space-xl) 0; /* More vertical margin */
        background-color: var(--bg-secondary); /* Light background for list */
        border-radius: var(--radius-md);
        border: 1px solid var(--border-color);
        overflow: hidden; /* Clip borders */
    }

    .contacts-list li {
        display: flex;
        flex-wrap: wrap; /* Allow wrapping on small screens */
        justify-content: space-between;
        align-items: center;
        gap: var(--space-md); /* Gap between name and number */
        padding: var(--space-md) var(--space-lg); /* Padding inside items */
        border-bottom: 1px solid var(--sandy-beige-light); /* Lighter separator */
    }

    .contacts-list li:last-child {
        border-bottom: none;
    }

    .contact-name {
        font-weight: 600; /* Bolder name */
        color: var(--text-primary);
        flex-basis: 50%; /* Give name more space initially */
        flex-grow: 1;
    }

    .contact-number {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        flex-shrink: 0; /* Prevent number shrinking too much */
    }

    .contact-number a {
        font-size: 1.2em;
        font-weight: 700;
        color: var(--ocean-blue);
        text-decoration: none;
        background-color: var(--ocean-blue-light);
        color: white;
        padding: var(--space-xs) var(--space-md);
        border-radius: var(--radius-sm);
        transition: background-color 0.2s;
        white-space: nowrap; /* Prevent number wrapping */
    }

    .contact-number a:hover {
        background-color: var(--ocean-blue-dark);
        text-decoration: none;
    }

     .contact-number .note {
        font-size: 0.8em;
        color: var(--text-secondary);
        font-style: italic;
     }


    .important-note {
        margin-top: var(--space-xl);
        font-size: 0.9em;
        color: var(--text-secondary);
        background-color: var(--sandy-beige-light);
        border-left: 4px solid var(--sunset-orange); /* Match H1 border color */
        padding: var(--space-md);
        border-radius: var(--radius-sm);
    }

     /* Remove potential conflicts */
     .contacts-page {}
</style>