<script>
    // Keep your existing categories array
     const categories = [
        {
            name: "Salutations & Essentiels",
            phrases: [
                 { fr: "Bonjour", en: "Hello / Good morning", darija: "Salam / Sbâh lkhir", amazigh: "Azul / Fulkin" },
                 { fr: "Bonsoir", en: "Good evening", darija: "Msa lkhir", amazigh: "Azul / Tidggʷatin" },
                 { fr: "Au revoir", en: "Goodbye", darija: "Bslama", amazigh: "Ar timlilit" },
                 { fr: "Oui", en: "Yes", darija: "Wakha / Iyyeh", amazigh: "Wah / Yan" },
                 { fr: "Non", en: "No", darija: "La", amazigh: "Oho" },
                 { fr: "S'il vous plaît", en: "Please", darija: "Afak", amazigh: "Ɛafak / Iɣ D ak iɛjb" },
                 { fr: "Merci (beaucoup)", en: "Thank you (very much)", darija: "Shukran (bzaf)", amazigh: "Shukran / Tanmirt (bahra)" },
                 { fr: "Excusez-moi / Pardon", en: "Excuse me / Sorry", darija: "Smah liya", amazigh: "Surf iyi" },
                 { fr: "Comment ça va ?", en: "How are you?", darija: "Labas?", amazigh: "Manzaakin? / Mamec tkkit?" },
                 { fr: "Je ne comprends pas", en: "I don't understand", darija: "Ma fhemtch", amazigh: "Ur fhimeɣ" },
                 { fr: "Parlez-vous anglais/français ?", en: "Do you speak English/French?", darija: "Wach kat hdar b lognlizia/franҫia?", amazigh: "Is tsawalt s Tngliziyt/Tfransist?" },
            ]
        },
        {
            name: "Au Restaurant / Café",
            phrases: [
                 { fr: "Une table pour deux, svp", en: "A table for two, please", darija: "Wahd tabla dyal jouj, afak", amazigh: "Yan tabla n sin, ɛafak" },
                 { fr: "Le menu, svp", en: "The menu, please", darija: "Lmenu, afak", amazigh: "Lmenu, ɛafak" },
                 { fr: "L'addition, svp", en: "The bill, please", darija: "Lhssab, afak", amazigh: "Lḥsab, ɛafak" },
                 { fr: "De l'eau, svp", en: "Water, please", darija: "Lma, afak", amazigh: "Aman, ɛafak" },
                 { fr: "Thé à la menthe", en: "Mint tea", darija: "Atay b neanaa", amazigh: "Atay s nnaɛnaɛ" },
                 { fr: "Café", en: "Coffee", darija: "Qahwa", amazigh: "Lqhwa" },
                 { fr: "C'était délicieux !", en: "It was delicious!", darija: "Kan ldid / Kan zwin!", amazigh: "Ifulki / Yexla !" },
            ]
        },
         {
            name: "Directions",
            phrases: [
                 { fr: "Où est... ?", en: "Where is...?", darija: "Fin kayna... ?", amazigh: "Mani illa...?" },
                 { fr: "À gauche", en: "Left", darija: "Ala lissr", amazigh: "Ẓer uzelmaḍ" },
                 { fr: "À droite", en: "Right", darija: "Ala limn", amazigh: "Ẓer ufusi" },
                 { fr: "Tout droit", en: "Straight ahead", darija: "Nishan", amazigh: "Garas garas / Nishan" },
                 { fr: "La plage", en: "The beach", darija: "Lbhar / La plage", amazigh: "La plage / Ifri" },
                 { fr: "Le souk", en: "The souk/market", darija: "Souk", amazigh: "Souk" },
            ]
        },
    ];
</script>

<svelte:head>
    <title>Guide de Conversation - Visit Agadir</title>
    <meta name="description" content="Phrases utiles en français, anglais, arabe marocain (darija) et amazigh pour votre séjour à Agadir." />
</svelte:head>

<div class="static-page-container phrasebook-page"> <!-- Add common container class -->
    <h1>Guide de Conversation</h1>
    <p class="intro-paragraph">Quelques phrases pour vous aider à communiquer lors de votre visite.</p>

    {#each categories as category (category.name)}
        <section class="category-section">
            <h2>{category.name}</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Français / English</th>
                            <th>Darija (Arabe Marocain)</th>
                            <th>Amazigh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each category.phrases as phrase}
                            <tr>
                                <td>{phrase.fr}<br><small>{phrase.en}</small></td>
                                <td>{phrase.darija}</td>
                                <td>{phrase.amazigh || 'N/A'}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </section>
    {/each}

    <p class="important-note">
        <strong>Note :</strong> La prononciation peut varier. Écouter les locaux est la meilleure façon d'apprendre ! Les transcriptions en Darija et Amazigh sont simplifiées et données à titre indicatif.
    </p>
</div>

<style>
    /* Common static page styles */
    .static-page-container {
        max-width: 900px;
        margin: 0 auto;
        padding: var(--space-md) 0 var(--space-xxl);
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
    }

    /* Section styling */
    .category-section {
        margin-bottom: var(--space-xl);
    }
    h2 {
        color: var(--ocean-blue);
        margin-bottom: var(--space-md);
        font-size: 1.5rem;
        padding-bottom: var(--space-sm);
        border-bottom: 1px solid var(--sandy-beige-dark);
    }

    /* Table styling */
    .table-container {
        width: 100%;
        overflow-x: auto; /* Keep horizontal scroll */
        -webkit-overflow-scrolling: touch;
        border: 1px solid var(--border-color); /* Add border around container */
        border-radius: var(--radius-md); /* Round corners of container */
         background-color: var(--bg-primary); /* Ensure background */
    }

    table {
        width: 100%;
        min-width: 550px; /* Ensure minimum width for scroll */
        border-collapse: collapse;
        font-size: 0.95rem;
        color: var(--text-primary);
    }

    th, td {
        border: 1px solid var(--sandy-beige-dark); /* Use theme border color */
        padding: var(--space-sm) var(--space-md); /* Use theme spacing */
        text-align: left;
        vertical-align: top;
        white-space: nowrap;
    }

    th {
        background-color: var(--sandy-beige-light); /* Use theme color */
        font-weight: 600; /* Slightly bolder */
        white-space: normal;
         color: var(--ocean-blue-dark); /* Header text color */
         position: sticky; /* Make header sticky within scroll container if desired */
         top: 0;
         z-index: 1;
    }

    /* Allow first column content to wrap */
    td:first-child { white-space: normal; }

    tr:nth-child(even) td { /* Use td selector for specificity */
        background-color: var(--bg-secondary); /* Stripe color */
    }
    tr:hover td { /* Hover effect */
         background-color: var(--sandy-beige-light);
    }

    td small { /* English text */
        display: block;
        color: var(--text-secondary);
        font-size: 0.9em;
        margin-top: var(--space-xs);
    }

     td:nth-child(2), td:nth-child(3) { /* Darija & Amazigh */
        font-style: italic;
     }

    /* Note styling */
    .important-note {
        margin-top: var(--space-xl);
        font-size: 0.9em;
        color: var(--text-secondary);
        background-color: var(--sandy-beige-light);
        border-left: 4px solid var(--ocean-blue);
        padding: var(--space-md);
        border-radius: var(--radius-sm);
    }
    /* Remove potential conflicts */
    .phrasebook-page { }
</style>