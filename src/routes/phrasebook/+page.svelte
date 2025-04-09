<script>
    // Exemple de données de phrases (MODIFIÉ: tachelhit -> amazigh)
    const categories = [
        {
            name: "Salutations & Essentiels",
            phrases: [
                { fr: "Bonjour", en: "Hello / Good morning", darija: "Salam / Sbâh lkhir", amazigh: "Azul / Fulkin" }, // Exemples actualisés
                { fr: "Bonsoir", en: "Good evening", darija: "Msa lkhir", amazigh: "Azul / Tidggʷatin" }, // Exemples actualisés
                { fr: "Au revoir", en: "Goodbye", darija: "Bslama", amazigh: "Ar timlilit" }, // Exemple actualisé
                { fr: "Oui", en: "Yes", darija: "Wakha / Iyyeh", amazigh: "Wah / Yan" }, // Exemple actualisé
                { fr: "Non", en: "No", darija: "La", amazigh: "Oho" }, // Inchangé
                { fr: "S'il vous plaît", en: "Please", darija: "Afak", amazigh: "Ɛafak / Iɣ D ak iɛjb" }, // Exemple actualisé
                { fr: "Merci (beaucoup)", en: "Thank you (very much)", darija: "Shukran (bzaf)", amazigh: "Shukran / Tanmirt (bahra)" }, // Exemple actualisé
                { fr: "Excusez-moi / Pardon", en: "Excuse me / Sorry", darija: "Smah liya", amazigh: "Surf iyi" }, // Exemple actualisé
                { fr: "Comment ça va ?", en: "How are you?", darija: "Labas?", amazigh: "Manzaakin? / Mamec tkkit?" }, // Exemple actualisé
                { fr: "Je ne comprends pas", en: "I don't understand", darija: "Ma fhemtch", amazigh: "Ur fhimeɣ" }, // Exemple actualisé
                { fr: "Parlez-vous anglais/français ?", en: "Do you speak English/French?", darija: "Wach kat hdar b lognlizia/françia?", amazigh: "Is tsawalt s Tngliziyt/Tfransist?" }, // Exemple actualisé
            ]
        },
        {
            name: "Au Restaurant / Café",
            phrases: [
                { fr: "Une table pour deux, svp", en: "A table for two, please", darija: "Wahd tabla dyal jouj, afak", amazigh: "Yan tabla n sin, ɛafak" },
                { fr: "Le menu, svp", en: "The menu, please", darija: "Lmenu, afak", amazigh: "Lmenu, ɛafak" },
                { fr: "L'addition, svp", en: "The bill, please", darija: "Lhssab, afak", amazigh: "Lḥsab, ɛafak" },
                { fr: "De l'eau, svp", en: "Water, please", darija: "Lma, afak", amazigh: "Aman, ɛafak" }, // Modifié
                { fr: "Thé à la menthe", en: "Mint tea", darija: "Atay b neanaa", amazigh: "Atay s nnaɛnaɛ" }, // Modifié
                { fr: "Café", en: "Coffee", darija: "Qahwa", amazigh: "Lqhwa" }, // Modifié
                { fr: "C'était délicieux !", en: "It was delicious!", darija: "Kan ldid / Kan zwin!", amazigh: "Ifulki / Yexla !" }, // Modifié
            ]
        },
         {
            name: "Directions",
            phrases: [
                { fr: "Où est... ?", en: "Where is...?", darija: "Fin kayna... ?", amazigh: "Mani illa...?" }, // Inchangé
                { fr: "À gauche", en: "Left", darija: "Ala lissr", amazigh: "Ɣer uzelmaḍ" }, // Modifié
                { fr: "À droite", en: "Right", darija: "Ala limn", amazigh: "Ɣer ufusi" }, // Modifié
                { fr: "Tout droit", en: "Straight ahead", darija: "Nishan", amazigh: "Garas garas / Nishan" }, // Modifié
                { fr: "La plage", en: "The beach", darija: "Lbhar / La plage", amazigh: "La plage / Ifri" }, // Modifié
                { fr: "Le souk", en: "The souk/market", darija: "Souk", amazigh: "Souk" }, // Inchangé
            ]
        },
        // Ajoute d'autres catégories (Shopping, Transport...)
    ];
    
    // Note: Les traductions en Darija et Amazigh sont des exemples et
    // peuvent varier (dialectes, prononciation). La vérification par des locaux est idéale.
    // J'ai essayé de mettre des traductions Amazigh plus plausibles mais elles restent à vérifier.
    </script>
    
    <svelte:head>
        <!-- MODIFIÉ: Tachelhit -> Amazigh -->
        <title>Guide de Conversation - Visit Agadir</title>
        <meta name="description" content="Phrases utiles en français, anglais, arabe marocain (darija) et amazigh pour votre séjour à Agadir." />
    </svelte:head>
    
    <div class="phrasebook-page"> 
        <h1>Guide de Conversation</h1>
        <p>Quelques phrases pour vous aider à communiquer lors de votre visite.</p>
    
        {#each categories as category (category.name)}
            <section class="category-section">
                <h2>{category.name}</h2>
                <!-- NOUVEAU: Conteneur pour le défilement horizontal -->
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Français / English</th>
                                <th>Darija (Arabe Marocain)</th>
                                <!-- MODIFIÉ: Tachelhit -> Amazigh -->
                                <th>Amazigh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each category.phrases as phrase}
                                <tr>
                                    <td>{phrase.fr}<br><small>{phrase.en}</small></td>
                                    <td>{phrase.darija}</td>
                                    <!-- MODIFIÉ: Utilise la clé 'amazigh' -->
                                    <td>{phrase.amazigh || 'N/A'}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div> <!-- FIN: Conteneur pour le défilement -->
            </section>
        {/each}
    
        <p class="important-note">
            <strong>Note :</strong> La prononciation peut varier. Écouter les locaux est la meilleure façon d'apprendre ! Les transcriptions en Darija et Amazigh sont simplifiées et données à titre indicatif.
        </p>
    </div>
    
    <style>
        .phrasebook-page {
            /*background-color: #fff; Supprimé pour potentiellement hériter du fond global */
            /* padding: 1.5rem; Supprimé car géré par content-padding */
            /*border-radius: 8px; Optionnel */
            /*box-shadow: 0 2px 10px rgba(0,0,0,0.1); Optionnel */
            max-width: 900px; /* Garde une largeur max */
            margin: 1rem auto;
        }

        h1 {
            color: var(--primary-color, #007bff); /* Utilise variable globale ou fallback */
            margin-top: 0;
            margin-bottom: 1rem;
            border-bottom: 2px solid var(--primary-color, #007bff);
            padding-bottom: 0.5rem;
        }
    
        .category-section {
            margin-top: 2rem;
            margin-bottom: 2rem; /* Ajout d'espace entre les sections */
        }
    
        h2 {
            color: var(--secondary-color, #555); /* Utilise variable globale ou fallback */
            margin-bottom: 1rem;
        }
    
        /* NOUVEAU: Style pour le conteneur du tableau */
        .table-container {
            width: 100%;
            overflow-x: auto; /* Ajoute une barre de défilement HORIZONTALE si nécessaire */
            -webkit-overflow-scrolling: touch; /* Améliore le défilement sur iOS */
        }
    
        table {
            width: 100%;
            min-width: 500px; /* Force une largeur minimale pour que le scroll apparaisse plus tôt si besoin */
            border-collapse: collapse;
            margin-top: 0.5rem;
            font-size: 0.95rem;
        }
    
        th, td {
            border: 1px solid #ddd;
            padding: 0.8rem;
            text-align: left;
            vertical-align: top;
            white-space: nowrap; /* Empêche le texte de passer à la ligne trop vite, forçant le scroll */
        }
    
        th {
            background-color: #f2f2f2;
            font-weight: bold;
            white-space: normal; /* Permet aux titres de colonnes de passer à la ligne */
        }
    
         /* Permet au contenu des cellules Français/Anglais de passer à la ligne */
        td:first-child {
            white-space: normal;
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
    
         td:nth-child(2), td:nth-child(3) { /* Darija & Amazigh */
            font-style: italic;
            color: #333;
         }
    
        .important-note {
            margin-top: 2rem;
            font-size: 0.9em;
            color: #555;
            background-color: #f9f9f9;
            border-left: 4px solid var(--primary-color, #007bff);
            padding: 1rem;
            border-radius: 4px;
        }
    </style>