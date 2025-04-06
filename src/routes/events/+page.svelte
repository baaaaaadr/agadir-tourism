<script>
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    // Optionnel: Importer un composant EventCard si on en crée un
    // import EventCard from '$lib/components/EventCard.svelte';

    export let data; // Reçoit les données de +page.js
    $: events = data?.events || [];
    $: loading = !data; // Indicateur simple de chargement initial

    const defaultImage = '/assets/images/default-placeholder.jpg'; // Image par défaut

    // Fonction pour formater les dates de manière lisible
    function formatEventDate(startDate, endDate) {
        if (!startDate) return "Date inconnue";

        const start = new Date(startDate);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'2-digit' };
        const startFormatted = start.toLocaleDateString('fr-FR', options);

        if (!endDate) {
            return `Le ${startFormatted}`;
        }

        const end = new Date(endDate);
        // Si même jour, affiche "Le [Date] de [Heure début] à [Heure fin]"
        if (start.toDateString() === end.toDateString()) {
             const startTime = start.toLocaleTimeString('fr-FR', { hour: 'numeric', minute:'2-digit' });
             const endTime = end.toLocaleTimeString('fr-FR', { hour: 'numeric', minute:'2-digit' });
             return `Le ${start.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} de ${startTime} à ${endTime}`;
        } else {
             // Si jours différents, affiche "Du [Date début] au [Date fin]"
             const endFormatted = end.toLocaleDateString('fr-FR', options);
             return `Du ${startFormatted} au ${endFormatted}`;
        }
    }

</script>

<svelte:head>
    <title>Événements à Agadir - Visit Agadir</title>
    <meta name="description" content="Découvrez les prochains événements, festivals, marchés et concerts à Agadir." />
</svelte:head>

<div class="events-page">
    <h1>Événements à Venir à Agadir</h1>

    {#if loading}
        <LoadingSpinner />
    {:else if events.length > 0}
        <ul class="events-list">
            {#each events as event (event.id)}
                <li class="event-item">
                    <img
                        src={event.image_url || defaultImage}
                        alt="Image pour {event.name}"
                        class="event-image"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='{defaultImage}';"
                    />
                    <div class="event-details">
                        <h2>{event.name}</h2>
                        {#if event.category}
                            <span class="category-badge">{event.category}</span>
                        {/if}
                        <p class="event-date">{formatEventDate(event.start_date, event.end_date)}</p>
                        {#if event.location_name}
                            <p class="event-location"><strong>Lieu :</strong> {event.location_name}</p>
                        {/if}
                        {#if event.description}
                            <p class="event-description">{event.description}</p>
                        {/if}
                         <!-- On pourrait ajouter un lien vers une page détail événement plus tard -->
                         <!-- {#if event.latitude && event.longitude} -->
                         <!--     <a href="/map?event={event.id}" class="map-link">Voir sur la carte</a> -->
                         <!-- {/if} -->
                    </div>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="no-events">Aucun événement à venir trouvé pour le moment. Revenez bientôt !</p>
    {/if}
</div>

<style>
    .events-page {
        max-width: 950px;
        margin: 1rem auto;
    }

    h1 {
        color: #fd7e14; /* Orange */
        margin-top: 0;
        margin-bottom: 1.5rem;
        text-align: center;
        border-bottom: 2px solid #fd7e14;
        padding-bottom: 0.5rem;
    }

    .events-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .event-item {
        display: flex;
        flex-direction: column; /* Par défaut sur mobile */
        gap: 1.5rem;
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 3px 12px rgba(0,0,0,0.1);
        margin-bottom: 2rem;
        overflow: hidden; /* Pour le border-radius de l'image */
    }

    /* Sur écran plus large, image à gauche, texte à droite */
    @media (min-width: 768px) {
        .event-item {
            flex-direction: row;
        }
    }

    .event-image {
        width: 100%; /* Prend toute la largeur sur mobile */
        max-width: 300px; /* Limite sur grand écran */
        height: 200px;
        object-fit: cover;
        border-radius: 6px;
        align-self: center; /* Centre sur mobile */
    }
     @media (min-width: 768px) {
        .event-image {
             width: 35%; /* Prend 35% sur grand écran */
             height: auto; /* Hauteur auto pour garder ratio */
             max-width: 300px; /* Garde la limite max */
             align-self: flex-start; /* Aligne en haut */
        }
     }


    .event-details {
        flex: 1; /* Prend l'espace restant */
    }

    .event-details h2 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: #0077cc;
        font-size: 1.5rem;
    }

    .category-badge {
        display: inline-block;
        background-color: #ffc107; /* Jaune */
        color: #333;
        padding: 0.2em 0.7em;
        border-radius: 0.25rem;
        font-size: 0.8em;
        font-weight: bold;
        margin-bottom: 0.8rem;
    }

    .event-date {
        font-weight: bold;
        color: #555;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
    }
     .event-location {
         color: #666;
         font-size: 0.9rem;
         margin-bottom: 1rem;
     }
     .event-location strong {
          color: #444;
     }

    .event-description {
        color: #333;
        line-height: 1.6;
        font-size: 0.95rem;
    }

    .no-events {
        text-align: center;
        font-style: italic;
        color: #666;
        margin-top: 3rem;
        padding: 2rem;
        background-color: #f8f9fa;
        border-radius: 8px;
    }

     .map-link { /* Style pour un futur lien carte */
        display: inline-block;
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #0077cc;
     }

</style>