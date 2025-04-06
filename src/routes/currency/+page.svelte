<script>
    // Page statique, pas de script nécessaire pour l'instant
</script>

<svelte:head>
    <title>Monnaie et Change à Agadir - Visit Agadir</title>
    <meta name="description" content="Informations sur le Dirham marocain (MAD), les taux de change indicatifs et où changer de l'argent à Agadir." />
</svelte:head>

<div class="currency-page">
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
            Les taux de change varient constamment. Les chiffres ci-dessous sont purement indicatifs et peuvent différer des taux réels au moment de votre visite. Vérifiez toujours le taux officiel au moment du change.
        </p>
        <ul class="rates-list">
            <li><strong>1 Euro (EUR)</strong> ≈ 10.8 - 11.0 MAD</li>
            <li><strong>1 Dollar US (USD)</strong> ≈ 9.8 - 10.2 MAD</li>
            <li><strong>1 Livre Sterling (GBP)</strong> ≈ 12.3 - 12.7 MAD</li>
            <!-- Ajoutez d'autres devises si pertinent -->
        </ul>
        <p>
            Pour obtenir le taux le plus à jour, consultez un convertisseur en ligne fiable ou renseignez-vous auprès des banques ou bureaux de change.
        </p>
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
            <li><strong>Comparez les taux :</strong> Surtout pour de grosses sommes, une petite différence de taux peut compter.</li>
            <li><strong>Gardez le bordereau :</strong> Conservez le reçu de change. Il vous sera demandé si vous souhaitez rechanger vos Dirhams restants avant de partir.</li>
            <li><strong>Pas de change "au noir" :</strong> Évitez les personnes proposant du change dans la rue, c'est illégal et risqué.</li>
            <li><strong>Ayez un peu de liquide :</strong> Bien que les cartes soient acceptées dans de nombreux hôtels, restaurants et boutiques modernes, il est toujours utile d'avoir de l'argent liquide pour les petits commerces, les souks, les taxis, etc.</li>
             <li><strong>Prévenez votre banque :</strong> Informez votre banque de votre voyage au Maroc pour éviter que vos cartes ne soient bloquées par mesure de sécurité.</li>
        </ul>
    </section>

</div>

<style>
    .currency-page {
        background-color: #fff;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-width: 850px;
        margin: 1rem auto;
        line-height: 1.7;
    }

    h1 {
        color: #20c997; /* Couleur menthe/turquoise */
        margin-top: 0;
        margin-bottom: 1.5rem;
        text-align: center;
        border-bottom: 2px solid #20c997;
        padding-bottom: 0.5rem;
    }

    section {
        margin-bottom: 2.5rem;
    }

    h2 {
        color: #0077cc;
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.4rem;
    }

    p {
        margin-bottom: 1rem;
        color: #333;
    }
    strong {
         color: #005fa3;
    }

    ul {
        margin-left: 1.5rem; /* Indentation standard */
        margin-bottom: 1rem;
    }
    li {
        margin-bottom: 0.7rem;
    }

    .rates-list {
        list-style: none;
        padding-left: 0;
    }
     .rates-list li {
         background-color: #f8f9fa;
         padding: 0.5rem 1rem;
         border-left: 3px solid #17a2b8; /* Bleu info */
         margin-bottom: 0.5rem;
     }
     .rates-list strong {
         color: #17a2b8;
     }

    /* Pour la section Conseils */
    section:last-child ul {
        list-style-type: '💡 '; /* Utilise une icône comme puce */
    }
     section:last-child li {
         margin-bottom: 0.8rem;
     }

</style>