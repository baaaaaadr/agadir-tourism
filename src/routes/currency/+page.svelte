<script lang="ts">
    // --- KEEP YOUR EXISTING SCRIPT BLOCK ---
    import { onMount } from 'svelte';
    import { browser } from '$app/environment'; // Needed if not already imported

    const apiKey = import.meta.env.VITE_EXCHANGERATE_API_KEY;
    const apiUrlBase = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

    let amount: number | null = 100;
    let fromCurrency: string = 'EUR';
    const toCurrency: string = 'MAD';
    let rates: Record<string, number> | null = null;
    let convertedAmount: string | null = null;
    let isLoading: boolean = true;
    let error: string | null = null;
    let lastUpdate: string | null = null;

    const supportedCurrencies: string[] = ['EUR', 'USD', 'GBP', 'CAD', 'CHF'];

    async function fetchRates(): Promise<void> {
         if (!browser) { isLoading = false; return; } // Don't fetch on server

         isLoading = true;
         error = null;
         rates = null;
         convertedAmount = null;

         if (!apiKey) {
             error = "Clé API manquante. Vérifiez la configuration (.env)";
             isLoading = false;
             console.error("Clé API non trouvée dans .env");
             return;
         }

         const apiUrl = `${apiUrlBase}EUR`; // Using EUR as base

         try {
             const response = await fetch(apiUrl);
             if (!response.ok) {
                 const errorData = await response.json().catch(() => ({}));
                 throw new Error(`Erreur API (${response.status}): ${errorData['error-type'] || response.statusText || 'Erreur inconnue'}`);
             }
             const data = await response.json();

             if (data.result === 'success') {
                 rates = data.conversion_rates;
                 lastUpdate = new Date(data.time_last_update_utc).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short'});
                 calculateConversion();
             } else {
                 throw new Error(data['error-type'] || 'Erreur lors de la récupération des taux.');
             }
         } catch (err) {
             if (err instanceof Error) { error = `Impossible de charger les taux: ${err.message}`; }
             else { error = `Impossible de charger les taux: Erreur inconnue (${String(err)})`; }
             rates = null;
         } finally {
             isLoading = false;
         }
     }

    function calculateConversion(): void {
         if (rates && amount !== null && fromCurrency) {
             const rateFrom = rates[fromCurrency];
             const rateTo = rates[toCurrency];

             if (rateFrom && rateTo) {
                  const amountInBase = fromCurrency === 'EUR' ? parseFloat(String(amount)) : parseFloat(String(amount)) / rateFrom;
                  if (!isNaN(amountInBase)) {
                     convertedAmount = (amountInBase * rateTo).toFixed(2);
                  } else { convertedAmount = 'N/A'; }
             } else { convertedAmount = 'N/A'; }
         } else { convertedAmount = null; }
     }

    onMount(fetchRates);

    $: if (browser && amount !== null && fromCurrency && rates && !isLoading) calculateConversion();

</script>

<svelte:head>
    <title>Monnaie, Change & Convertisseur - Agadir</title>
    <meta name="description" content="Informations sur le Dirham marocain (MAD), taux de change, convertisseur de devises et où changer de l'argent à Agadir." />
</svelte:head>

<div class="static-page-container currency-page"> <!-- Add common container class -->

    <h1>Monnaie Marocaine & Change</h1>

    <!-- SECTION: Convertisseur de Devises -->
    <section class="converter-section content-section"> <!-- Add content-section class -->
        <h2>Convertisseur Rapide (vers MAD)</h2>

        {#if isLoading && !rates}
            <div class="loading-message">Chargement des taux de change...</div>
        {:else if error}
            <div class="error-message">{error}</div>
        {:else if rates}
            <div class="converter-form">
                <div class="input-group">
                    <label for="amount">Montant :</label>
                    <input type="text" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" id="amount" bind:value={amount} placeholder="Montant">
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
                    <span class="converted-value">{convertedAmount ?? (isLoading ? '...' : 'N/A')}</span>
                    <span>{toCurrency}</span>
                </div>
            </div>
            {#if lastUpdate}
                 <p class="update-info">Taux indicatifs mis à jour le : {lastUpdate} (Source: ExchangeRate-API)</p>
            {/if}
        {:else}
             <div class="error-message">Impossible d'afficher le convertisseur.</div>
        {/if}
    </section>
    <!-- FIN SECTION Convertisseur -->

    <section class="content-section"> <!-- Add content-section class -->
        <h2>Le Dirham Marocain (MAD)</h2>
        <p>
            La monnaie officielle du Maroc est le <strong>Dirham marocain</strong>, souvent abrégé en <strong>MAD</strong> ou <strong>Dh</strong>. Un Dirham est divisé en 100 centimes.
        </p>
        <p>
            Vous trouverez des pièces de 1, 5, 10, 20, 50 centimes et de 1, 2, 5, 10 Dirhams. Les billets les plus courants sont ceux de 20, 50, 100 et 200 Dirhams.
        </p>
        <p class="important-note" style="margin-top: var(--space-sm);"> <!-- Style inline for margin adjustment -->
            <strong>Important :</strong> Le Dirham marocain est une monnaie non convertible en dehors du Maroc. Il est illégal d'importer ou d'exporter des Dirhams en grande quantité. Vous devrez donc changer votre argent à votre arrivée et rechanger les Dirhams restants (sur présentation du bordereau de change initial) avant votre départ.
        </p>
    </section>

    <!-- Removed static rates list as converter is primary -->

    <section class="content-section"> <!-- Add content-section class -->
        <h2>Où Changer de l'Argent à Agadir ?</h2>
        <p>Plusieurs options s'offrent à vous pour changer vos devises en Dirhams :</p>
        <ul>
            <li>
                <strong>Aéroport d'Agadir Al Massira :</strong> Bureaux de change disponibles à l'arrivée (taux parfois moins favorables).
            </li>
            <li>
                <strong>Banques :</strong> Agences en ville (Attijariwafa, BMCE, Banque Populaire...) offrant des taux officiels (horaires limités).
            </li>
            <li>
                <strong>Bureaux de Change Agréés :</strong> Nombreux en zones touristiques, taux compétitifs et horaires étendus. Comparez les taux affichés.
             </li>
             <li>
                <strong>Distributeurs Automatiques (DAB / ATM) :</strong> Option simple avec cartes internationales (Visa, Mastercard). Vérifiez les frais de votre banque.
            </li>
            <li>
                <strong>Hôtels :</strong> Service de change souvent disponible, mais taux généralement moins avantageux.
            </li>
        </ul>
    </section>

     <section class="content-section"> <!-- Add content-section class -->
        <h2>Conseils Pratiques</h2>
        <ul>
            <li><strong>Comparez les taux :</strong> Surtout pour de grosses sommes. Les taux dans les bureaux peuvent légèrement différer des taux interbancaires (commissions).</li>
            <li><strong>Gardez le bordereau :</strong> Conservez le reçu de change pour pouvoir rechanger vos Dirhams restants au départ.</li>
            <li><strong>Pas de change "au noir" :</strong> Évitez le change illégal dans la rue.</li>
            <li><strong>Ayez du liquide :</strong> Utile pour petits commerces, souks, taxis, etc., même si les cartes sont de plus en plus acceptées.</li>
             <li><strong>Prévenez votre banque :</strong> Informez votre banque de votre voyage pour éviter le blocage de vos cartes.</li>
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
        margin-bottom: var(--space-xl);
    }

    /* Common section style - BUT WE WILL REMOVE BG for most sections on THIS page */
    .content-section {
        margin-bottom: var(--space-xl);
        /* Remove background/padding/border by default for this page, apply ONLY to converter */
        /* background-color: var(--bg-secondary); */
        /* padding: var(--space-lg); */
        /* border-radius: var(--radius-md); */
        /* border: 1px solid var(--sandy-beige-light); */
    }
     .content-section h2 { /* Styles for H2 inside sections */
        color: var(--ocean-blue);
        margin-top: 0;
        margin-bottom: var(--space-md);
        font-size: 1.4rem;
        padding-bottom: var(--space-sm);
        border-bottom: 1px solid var(--sandy-beige-dark);
    }

    p { /* Default paragraph */
        margin-bottom: var(--space-md);
        color: var(--text-primary);
    }
    strong { font-weight: 600; color: inherit; }

     ul {
         margin-left: 0;
         padding-left: var(--space-lg);
         list-style: disc;
         margin-bottom: 0;
     }
     li { margin-bottom: var(--space-md); }
     li strong { font-weight: 600; }

     .important-note {
         font-size: 0.9em;
         color: var(--text-secondary);
         background-color: var(--sandy-beige-light);
         border-left: 4px solid var(--ocean-blue);
         padding: var(--space-md);
         border-radius: var(--radius-sm);
         margin-top: var(--space-lg); /* Added margin-top */
     }

    /* --- Converter specific styles --- */
    .converter-section {
        /* Apply the section styling ONLY to the converter */
         padding: var(--space-lg);
         border-radius: var(--radius-md);
         background-color: var(--bg-secondary); /* Use standard secondary background */
         border: 1px solid var(--border-color); /* Use standard border */
    }
    .converter-section h2 {
         color: var(--ocean-blue-dark);
         text-align: center;
         border: none;
         font-size: 1.6rem;
         margin-bottom: var(--space-xl); /* More space below title */
    }

    .converter-form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end; /* Align items bottom for better label alignment */
        justify-content: center;
        gap: var(--space-lg);
        margin-bottom: var(--space-md);
    }

    .input-group {
        display: flex;
        flex-direction: column; /* Stack label and input */
        gap: var(--space-xs); /* Small gap between label and input */
    }
     .input-group label {
        font-weight: 500;
        color: var(--text-primary);
        font-size: 0.9rem; /* Smaller label */
        text-align: left; /* Align label text left */
        width: 100%; /* Ensure label takes width */
    }
    .input-group input[type="text"], .input-group select {
         padding: var(--space-sm) var(--space-md);
         border: 1px solid var(--sandy-beige-dark);
         border-radius: var(--radius-sm);
         font-size: 1rem;
         /* Set a consistent width */
         width: 150px;
         background-color: var(--bg-primary);
         color: var(--text-primary);
         box-sizing: border-box; /* Include padding/border in width */
    }

    .result-group {
         display: flex;
         align-items: center; /* Center items vertically */
         gap: var(--space-sm);
         padding-bottom: calc(var(--space-sm) + 1px); /* Align bottom roughly with inputs */
    }
     .result-group span:first-child { /* The ≈ symbol */
         font-size: 1.5rem; /* Make symbol larger */
         color: var(--text-secondary);
         padding-right: var(--space-xs);
     }
    .result-group .converted-value {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--ocean-blue-dark);
        background-color: var(--bg-primary);
        padding: calc(var(--space-sm) + 2px) var(--space-md); /* Match input height better */
        border-radius: var(--radius-sm);
        border: 1px solid var(--sandy-beige-dark);
        min-width: 150px; /* Match input width */
        display: inline-block;
        text-align: right;
        box-sizing: border-box;
    }
     .result-group span:last-child { /* The "MAD" text */
         font-size: 1rem;
         font-weight: 500;
         color: var(--text-secondary);
     }

    .update-info {
        font-size: 0.85rem;
        color: var(--text-secondary); /* Make slightly darker for better contrast */
        text-align: center;
        margin-top: var(--space-lg);
        margin-bottom: 0;
        width: 100%; /* Ensure it takes full width in flex */
    }

     /* Loading / Error messages - keep as is, they are standard */
     .loading-message, .error-message {
        text-align: center;
        padding: var(--space-md);
        border-radius: var(--radius-sm);
        margin: var(--space-md) auto;
        max-width: 90%;
     }
     .loading-message {
         color: var(--ocean-blue-dark);
         background-color: var(--ocean-blue-light);
         border: 1px solid var(--ocean-blue);
     }
     .error-message {
        color: #721c24;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        font-weight: 500;
     }

     /* Remove potential conflicts */
     .currency-page {}
</style>