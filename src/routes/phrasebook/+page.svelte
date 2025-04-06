<script>
// Exemple de données de phrases (tu pourras les améliorer ou les stocker ailleurs plus tard)
const categories = [
    {
        name: "Salutations & Essentiels",
        phrases: [
            { fr: "Bonjour", en: "Hello / Good morning", darija: "Salam / Sbâh lkhir", tachelhit: "(à vérifier)" },
            { fr: "Bonsoir", en: "Good evening", darija: "Msa lkhir", tachelhit: "(à vérifier)" },
            { fr: "Au revoir", en: "Goodbye", darija: "Bslama", tachelhit: "(à vérifier)" },
            { fr: "Oui", en: "Yes", darija: "Wakha / Iyyeh", tachelhit: "Wah" },
            { fr: "Non", en: "No", darija: "La", tachelhit: "Oho" },
            { fr: "S'il vous plaît", en: "Please", darija: "Afak", tachelhit: "(à vérifier)" },
            { fr: "Merci (beaucoup)", en: "Thank you (very much)", darija: "Shukran (bzaf)", tachelhit: "Shukran" },
            { fr: "Excusez-moi / Pardon", en: "Excuse me / Sorry", darija: "Smah liya", tachelhit: "(à vérifier)" },
            { fr: "Comment ça va ?", en: "How are you?", darija: "Labas?", tachelhit: "Manzaakin?" },
            { fr: "Je ne comprends pas", en: "I don't understand", darija: "Ma fhemtch", tachelhit: "(à vérifier)" },
            { fr: "Parlez-vous anglais/français ?", en: "Do you speak English/French?", darija: "Wach kat hdar b lognlizia/françia?", tachelhit: "(à vérifier)" },
        ]
    },
    {
        name: "Au Restaurant / Café",
        phrases: [
            { fr: "Une table pour deux, svp", en: "A table for two, please", darija: "Wahd tabla dyal jouj, afak", tachelhit: "(à vérifier)" },
            { fr: "Le menu, svp", en: "The menu, please", darija: "Lmenu, afak", tachelhit: "(à vérifier)" },
            { fr: "L'addition, svp", en: "The bill, please", darija: "Lhssab, afak", tachelhit: "(à vérifier)" },
            { fr: "De l'eau, svp", en: "Water, please", darija: "Lma, afak", tachelhit: "Aman" },
            { fr: "Thé à la menthe", en: "Mint tea", darija: "Atay b neanaa", tachelhit: "Atay" },
            { fr: "Café", en: "Coffee", darija: "Qahwa", tachelhit: "(à vérifier)" },
            { fr: "C'était délicieux !", en: "It was delicious!", darija: "Kan ldid / Kan zwin!", tachelhit: "(à vérifier)" },
        ]
    },
     {
        name: "Directions",
        phrases: [
            { fr: "Où est... ?", en: "Where is...?", darija: "Fin kayna... ?", tachelhit: "Mani illa...?" },
            { fr: "À gauche", en: "Left", darija: "Ala lissr", tachelhit: "(à vérifier)" },
            { fr: "À droite", en: "Right", darija: "Ala limn", tachelhit: "(à vérifier)" },
            { fr: "Tout droit", en: "Straight ahead", darija: "Nishan", tachelhit: "(à vérifier)" },
            { fr: "La plage", en: "The beach", darija: "Lbhar / La plage", tachelhit: "(à vérifier)" },
            { fr: "Le souk", en: "The souk/market", darija: "Souk", tachelhit: "Souk" },
        ]
    },
    // Ajoute d'autres catégories (Shopping, Transport...)
];

// Note: Les traductions en Darija et surtout Tachelhit sont des exemples et
// peuvent varier ou nécessiter une vérification par des locuteurs natifs.
</script>

<svelte:head>
    <title>Guide de Conversation - Visit Agadir</title>
    <meta name="description" content="Phrases utiles en français, anglais, arabe marocain (darija) pour votre séjour à Agadir." />
</svelte:head>

<div class="phrasebook-page">
    <h1>Guide de Conversation</h1>
    <p>Quelques phrases pour vous aider à communiquer lors de votre visite.</p>

    {#each categories as category (category.name)}
        <section class="category-section">
            <h2>{category.name}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Français / English</th>
                        <th>Darija (Arabe Marocain)</th>
                        <th>Tachelhit (Berbère)</th>
                    </tr>
                </thead>
                <tbody>
                    {#each category.phrases as phrase}
                        <tr>
                            <td>{phrase.fr}<br><small>{phrase.en}</small></td>
                            <td>{phrase.darija}</td>
                            <td>{phrase.tachelhit || 'N/A'}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </section>
    {/each}

    <p class="important-note">
        <strong>Note :</strong> La prononciation peut varier. Écouter les locaux est la meilleure façon d'apprendre ! Les transcriptions en Darija et Tachelhit sont simplifiées.
    </p>
</div>

<style>
    .phrasebook-page {
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-width: 900px;
        margin: 1rem auto;
    }

    h1 {
        color: #5bc0de; /* Bleu clair */
        margin-top: 0;
        margin-bottom: 1rem;
        border-bottom: 2px solid #5bc0de;
        padding-bottom: 0.5rem;
    }

    .category-section {
        margin-top: 2rem;
    }

    h2 {
        color: #0077cc;
        margin-bottom: 1rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 0.5rem;
        font-size: 0.95rem;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 0.8rem;
        text-align: left;
        vertical-align: top;
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    td small {
        display: block;
        color: #666;
        font-size: 0.9em;
        margin-top: 0.2rem;
    }

     td:nth-child(2), td:nth-child(3) { /* Darija & Tachelhit */
        font-style: italic;
        color: #333;
     }

    .important-note {
        margin-top: 2rem;
        font-size: 0.9em;
        color: #555;
        background-color: #f9f9f9;
        border-left: 4px solid #5bc0de;
        padding: 1rem;
        border-radius: 4px;
    }
</style>