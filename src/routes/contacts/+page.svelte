<script>
    // Pas de script spécifique nécessaire pour cette page statique pour l'instant
</script>

<svelte:head>
    <title>Contacts d'Urgence - Visit Agadir</title>
    <meta name="description" content="Numéros de téléphone importants et contacts d'urgence à Agadir." />
</svelte:head>

<div class="contacts-page">
    <h1>Contacts d'Urgence à Agadir</h1>
    <p>Voici quelques numéros utiles en cas de besoin pendant votre séjour à Agadir.</p>

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
                 <!-- Note: Au Maroc, le 15 est souvent utilisé pour les urgences médicales via la Protection Civile -->
            </span>
        </li>
         <li>
            <span class="contact-name">Police Touristique Agadir</span>
            <span class="contact-number">
                <a href="tel:+212528840912" title="Appeler la Police Touristique">05 28 84 09 12</a>
                 (Numéro exemple, à vérifier)
            </span>
        </li>
         <li>
            <span class="contact-name">Renseignements Téléphoniques</span>
            <span class="contact-number">
                <a href="tel:160" title="Appeler les Renseignements">160</a>
            </span>
        </li>
        <!-- Ajoutez d'autres contacts si nécessaire (Consulat, etc.) -->
    </ul>

    <p class="important-note">
        <strong>Note :</strong> Pour appeler depuis un numéro étranger, composez l'indicatif du Maroc (+212) et supprimez le premier '0' du numéro local (si applicable). Vérifiez toujours ces numéros auprès de sources officielles car ils peuvent changer.
    </p>
</div>

<style>
    .contacts-page {
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-width: 800px;
        margin: 1rem auto;
    }

    h1 {
        color: #d9534f; /* Couleur rouge pour l'urgence */
        margin-top: 0;
        margin-bottom: 1rem;
        border-bottom: 2px solid #f0ad4e; /* Orange */
        padding-bottom: 0.5rem;
    }

    .contacts-list {
        list-style: none;
        padding: 0;
        margin: 1.5rem 0;
    }

    .contacts-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8rem 0;
        border-bottom: 1px solid #eee;
    }

    .contacts-list li:last-child {
        border-bottom: none;
    }

    .contact-name {
        font-weight: bold;
        color: #333;
        flex-basis: 60%; /* Donne plus de place au nom */
    }

    .contact-number a {
        font-size: 1.2em;
        font-weight: bold;
        color: #0077cc;
        text-decoration: none;
        background-color: #e7f3fe;
        padding: 0.3rem 0.8rem;
        border-radius: 4px;
        transition: background-color 0.2s;
    }

    .contact-number a:hover {
        background-color: #cce5ff;
        text-decoration: none;
    }

     .contact-number span { /* Pour le texte à côté du numéro */
        font-size: 0.8em;
        color: #666;
        margin-left: 5px;
     }


    .important-note {
        margin-top: 2rem;
        font-size: 0.9em;
        color: #555;
        background-color: #f9f9f9;
        border-left: 4px solid #f0ad4e;
        padding: 1rem;
        border-radius: 4px;
    }
</style>