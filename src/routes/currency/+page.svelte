<script>
    import { onMount } from 'svelte';

    // Récupère la clé API depuis les variables d'environnement
    const apiKey = import.meta.env.VITE_EXCHANGERATE_API_KEY;
    const apiUrlBase = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`; // Base de l'URL

    let amount = 100; // Montant par défaut
    let fromCurrency = 'EUR'; // Devise source par défaut
    const toCurrency = 'MAD'; // Toujours convertir vers MAD
    let rates = null; // Pour stocker les taux de change reçus
    let convertedAmount = null;
    let isLoading = true; // Commence en chargement
    let error = null;
    let lastUpdate = null;

    // Liste des devises courantes à proposer
    const supportedCurrencies = ['EUR', 'USD', 'GBP', 'CAD', 'CHF']; // Tu peux en ajouter/retirer

    // Fonction pour récupérer les taux de change (basée sur fromCurrency)
    async function fetchRates() {
        isLoading = true;
        error = null;
        rates = null; // Réinitialise les taux avant de les chercher
        convertedAmount = null; // Réinitialise le montant converti

        if (!apiKey) {
            error = "Clé API manquante. Vérifiez la configuration (.env)";
            isLoading = false;
            console.error("Clé API non trouvée dans .env");
            return;
        }

        // Utilise la devise "from" comme base pour minimiser les appels si elle change souvent,
        // mais pour cette API, utiliser une base fixe (EUR ou USD) est souvent plus simple.
        // Restons sur EUR comme base pour l'instant, car l'API gratuite le gère bien.
        const apiUrl = `${apiUrlBase}EUR`;
        console.log("Tentative de fetch vers :", apiUrl);

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Erreur réponse API:", response.status, errorData);
                throw new Error(`Erreur API (${response.status}): ${errorData['error-type'] || response.statusText || 'Erreur inconnue'}`);
            }
            const data = await response.json();
            console.log("Données API reçues:", data);

            if (data.result === 'success') {
                rates = data.conversion_rates;
                lastUpdate = new Date(data.time_last_update_utc).toLocaleString('fr-FR');
                // Appel initial pour calculer avec les valeurs par défaut
                calculateConversion();
            } else {
                console.error("Erreur dans les données API:", data['error-type']);
                throw new Error(data['error-type'] || 'Erreur lors de la récupération des taux.');
            }
        } catch (err) {
            console.error("Erreur catch fetchRates:", err);
            error = `Impossible de charger les taux: ${err.message}`;
            rates = null;
        } finally {
            isLoading = false;
        }
    }

    // Fonction pour calculer la conversion
    function calculateConversion() {
        if (rates && amount !== null && fromCurrency) {
            const rateFrom = rates[fromCurrency]; // Taux de la devise source par rapport à l'EUR (base)
            const rateTo = rates[toCurrency];   // Taux du MAD par rapport à l'EUR (base)

            if (rateFrom && rateTo) {
                 // Conversion: Montant en EUR = amount / rateFrom (si from n'est pas EUR)
                 // Montant en MAD = Montant en EUR * rateTo
                 const amountInBase = fromCurrency === 'EUR' ? parseFloat(amount) : parseFloat(amount) / rateFrom;
                 if (!isNaN(amountInBase)) { // Vérifie que le montant est un nombre valide
                    convertedAmount = (amountInBase * rateTo).toFixed(2); // Arrondi à 2 décimales
                 } else {
                    convertedAmount = 'N/A'; // Montant invalide
                 }
            } else {
                convertedAmount = 'N/A'; // Taux non trouvé
                console.warn(`Taux non trouvé pour ${fromCurrency} ou ${toCurrency}`);
            }
        } else {
            convertedAmount = null; // Pas assez d'infos pour calculer
        }
    }

    // Récupère les taux au chargement du composant (DÉCOMMENTÉ)
    onMount(fetchRates);

    // Recalcule quand le montant ou la devise source change (DÉCOMMENTÉ)
    $: if (amount !== null && fromCurrency && rates && !isLoading) calculateConversion();
    // Ajout de !isLoading pour éviter calcul pendant chargement initial

</script>

<svelte:head>
    <title>Monnaie, Change & Convertisseur - Agadir</title>
    <meta name="description" content="Informations sur le Dirham marocain (MAD), taux de change, convertisseur de devises et où changer de l'argent à Agadir." />
</svelte:head>

<!-- Ajout de content-padding pour cohérence globale -->
<div class="currency-page content-padding">

    <!-- SECTION: Convertisseur de Devises -->
    <section class="converter-section">
        <h2>Convertisseur Rapide (vers MAD)</h2>

        {#if isLoading && !rates} <!-- Modifié pour afficher chargement seulement au début -->
            <p class="loading-message">Chargement des taux de change...</p>
        {:else if error}
            <p class="error-message">{error}</p>
        {:else if rates}
            <div class="converter-form">
                <div class="input-group">
                    <label for="amount">Montant :</label>
                    <!-- Utilisation de type="text" et inputmode="decimal" pour meilleure compatibilité mobile -->
                    <input type="text" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" id="amount" bind:value={amount} placeholder="Entrez un montant">
                </div>
                <div class="input-group">
                    <label for="fromCurrency">De :</label>
                    <select id="fromCurrency" bind:value={fromCurrency}>
                        {#each supportedCurrencies as currency}
                            <option value={currency}>{currency}</option>
                        {/each}
                    </select>
                </div>
                <div class="result-group">
                    <span>≈</span>
                    <span class="converted-value">{convertedAmount ?? (isLoading ? '...' : 'N/A')}</span> <!-- Affiche ... si recalcul en cours -->
                    <span>{toCurrency}</span>
                </div>
            </div>
            {#if lastUpdate}
                 <p class="update-info">Taux mis à jour le : {lastUpdate} (Source: ExchangeRate-API)</p>
            {/if}
        {:else}
             <p class="error-message">Impossible d'afficher le convertisseur.</p>
        {/if}
    </section>
    <!-- FIN SECTION Convertisseur -->

    <!-- Contenu statique existant commence ici -->
    <h1>Monnaie Marocaine (Dirham - MAD)</h1>

    <section>
        <h2>Le Dirham Marocain (MAD)</h2>
        <p>
            La monnaie officielle du Maroc est le <strong>Dirham marocain</strong>, souvent abrégé en <strong>MAD</strong> ou <strong>Dh</strong>. Un Dirham est divisé en 100 centimes.
        </p>
        <p>
            Vous trouverez des pièces de 1, 5, 10, 20, 50 centimes et de 1, 2, 5, 10 Dirhams. Les billets les plus courants sont ceux de 20, 50, 100 et 200 Dirhams.
        </p>
        <p>
            <strong>Important :</strong> Le Dirham marocain est une monnaie non convertible en dehors du Maroc. Il est illégal d'importer ou d'exporter des Dirhams en grande quantité. Vous devrez donc changer votre argent à votre arrivée et rechanger les Dirhams restants (sur présentation du bordereau de change initial) avant votre départ.
        </p>
    </section>

    <section>
        <h2>Taux de Change Indicatifs (Variables)</h2>
        <p>
            Les taux de change varient constamment. Pour une conversion précise, utilisez le convertisseur ci-dessus. Les chiffres ci-dessous sont de moins en moins pertinents mais peuvent donner un ordre d'idée historique.
        </p>
        <!-- La liste statique est moins utile maintenant, mais on la laisse pour l'instant -->
        <ul class="rates-list">
            <li><strong>1 Euro (EUR)</strong> ≈ 10.8 - 11.0 MAD</li>
            <li><strong>1 Dollar US (USD)</strong> ≈ 9.8 - 10.2 MAD</li>
            <li><strong>1 Livre Sterling (GBP)</strong> ≈ 12.3 - 12.7 MAD</li>
        </ul>
    </section>

    <section>
        <h2>Où Changer de l'Argent à Agadir ?</h2>
        <p>Plusieurs options s'offrent à vous pour changer vos devises en Dirhams :</p>
        <ul>
            <li>
                <strong>Aéroport d'Agadir Al Massira :</strong> Des bureaux de change sont disponibles à l'aéroport, pratiques à l'arrivée mais les taux peuvent être légèrement moins favorables.
            </li>
            <li>
                <strong>Banques :</strong> Les principales banques marocaines (Attijariwafa Bank, BMCE Bank of Africa, Banque Populaire, CIH Bank, etc.) ont des agences dans toute la ville et offrent généralement des taux de change officiels et fiables. Elles peuvent avoir des horaires d'ouverture limités (fermées le week-end après-midi, par exemple).
            </li>
            <li>
                <strong>Bureaux de Change Agréés :</strong> Vous trouverez de nombreux bureaux de change indépendants en ville, notamment dans les zones touristiques (front de mer, centre-ville). Assurez-vous qu'ils sont agréés (affichent souvent un logo officiel). Leurs taux sont généralement compétitifs et leurs horaires plus étendus que les banques. Comparez les taux affichés avant de choisir.
            </li>
             <li>
                <strong>Distributeurs Automatiques de Billets (DAB / ATM) :</strong> C'est souvent l'option la plus simple. De nombreux distributeurs acceptent les cartes internationales (Visa, Mastercard). Ils vous donneront directement des Dirhams au taux de change de votre banque (vérifiez les frais éventuels appliqués par votre banque et par la banque locale). C'est une bonne option pour retirer de petites sommes au fur et à mesure.
            </li>
            <li>
                <strong>Hôtels :</strong> Certains grands hôtels proposent un service de change, mais les taux sont souvent moins avantageux qu'en banque ou dans les bureaux de change. À utiliser en dépannage.
            </li>
        </ul>
    </section>

     <section>
        <h2>Conseils Pratiques</h2>
        <ul>
            <li><strong>Comparez les taux :</strong> Surtout pour de grosses sommes, une petite différence de taux peut compter. Le convertisseur ci-dessus utilise des taux interbancaires, les taux réels dans les bureaux peuvent légèrement différer (commission).</li>
            <li><strong>Gardez le bordereau :</strong> Conservez le reçu de change. Il vous sera demandé si vous souhaitez rechanger vos Dirhams restants avant de partir.</li>
            <li><strong>Pas de change "au noir" :</strong> Évitez les personnes proposant du change dans la rue, c'est illégal et risqué.</li>
            <li><strong>Ayez un peu de liquide :</strong> Bien que les cartes soient acceptées dans de nombreux hôtels, restaurants et boutiques modernes, il est toujours utile d'avoir de l'argent liquide pour les petits commerces, les souks, les taxis, etc.</li>
             <li><strong>Prévenez votre banque :</strong> Informez votre banque de votre voyage au Maroc pour éviter que vos cartes ne soient bloquées par mesure de sécurité.</li>
        </ul>
    </section>

</div>

<style>
    /* Styles existants (adaptés si nécessaire) */
    .currency-page {
        max-width: 850px;
        margin: 1rem auto;
        line-height: 1.7;
    }

     /* Style pour le padding global si défini dans app.css */
    .content-padding {
        padding-left: var(--padding-global, 1rem);
        padding-right: var(--padding-global, 1rem);
        padding-top: 1rem;
        padding-bottom: 1rem;
   }

    /* Styles pour la section convertisseur */
    .converter-section {
        background-color: #eef8ff; /* Fond bleu très clair */
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 2.5rem; /* Espace avant le contenu statique */
        border: 1px solid #bde0fe;
    }

    .converter-section h2 {
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: var(--primary-color, #007bff);
        text-align: center;
        font-size: 1.6rem;
    }

    .converter-form {
        display: flex;
        flex-wrap: wrap; /* Permet de passer à la ligne sur petits écrans */
        align-items: center;
        justify-content: center; /* Centre les éléments */
        gap: 1rem; /* Espace entre les groupes */
        margin-bottom: 1rem;
    }

    .input-group, .result-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .input-group label {
        font-weight: 500;
        color: #333;
    }

    /* Style pour l'input montant */
    .input-group input[type="text"] {
         padding: 0.6rem 0.8rem;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 1rem;
        min-width: 80px;
        /* Pour l'alignement du texte à droite si besoin */
        /* text-align: right; */
    }

    /* Style pour le select devise */
    .input-group select {
        padding: 0.6rem 0.8rem;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 1rem;
        min-width: 80px; /* Largeur minimale */
    }


    .result-group {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--primary-color, #007bff);
    }

    .result-group .converted-value {
        background-color: #fff;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        border: 1px solid #ced4da;
        min-width: 100px; /* Largeur minimale pour l'affichage */
        display: inline-block; /* Pour appliquer padding/border */
        text-align: right;
    }

    .update-info {
        font-size: 0.85rem;
        color: #6c757d;
        text-align: center;
        margin-top: 1rem;
    }

     .loading-message, .error-message {
        text-align: center;
        padding: 1rem;
        border-radius: 4px;
     }
     .loading-message {
         color: #004085;
         background-color: #cce5ff;
         border: 1px solid #b8daff;
     }
     .error-message {
        color: #721c24;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        font-weight: 500;
     }

    /* Styles pour le contenu statique */
    h1 {
        color: var(--secondary-color, #333);
        margin-top: 0;
        margin-bottom: 1.5rem;
        text-align: center;
        border-bottom: 2px solid var(--secondary-color, #ccc);
        padding-bottom: 0.5rem;
    }

    section {
        margin-bottom: 2.5rem;
    }

    h2 { /* Style par défaut pour les titres H2 des sections statiques */
        color: var(--primary-color, #007bff);
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.4rem;
    }

    p {
        margin-bottom: 1rem;
        color: #333;
    }
    strong {
         font-weight: bold;
         color: inherit;
    }

    ul {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
    }
    li {
        margin-bottom: 0.7rem;
    }

    .rates-list {
        list-style: none;
        padding-left: 0;
        opacity: 0.7;
    }
     .rates-list li {
         background-color: #f8f9fa;
         padding: 0.5rem 1rem;
         border-left: 3px solid #6c757d;
         margin-bottom: 0.5rem;
     }
     .rates-list strong {
         color: #343a40;
     }

    /* Pour la section Conseils */
    section:last-child ul {
        list-style-type: '💡 ';
    }
     section:last-child li {
         margin-bottom: 0.8rem;
     }

</style>