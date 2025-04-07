<script>
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import ErrorMessage from '$lib/components/ErrorMessage.svelte'; // Assure-toi d'avoir ce composant ou adapte
    import { ExternalLink } from 'lucide-svelte'; // Icône pour les liens externes

    export let data; // Reçoit les données de +page.js
    $: events = data?.events || [];
    $: pageError = data?.error; // Récupère l'erreur éventuelle
    $: loading = !data && !pageError; // Chargement si pas de données et pas d'erreur

    const defaultImage = '/assets/images/default-placeholder.jpg';

    function formatEventDate(startDate, endDate) {
        // ... (la fonction formatEventDate reste exactement la même) ...
         if (!startDate) return "Date inconnue";

        const start = new Date(startDate);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'2-digit' };
        const startFormatted = start.toLocaleDateString('fr-FR', options);

        if (!endDate) {
            // Affichage si juste date de début
             const startTime = start.toLocaleTimeString('fr-FR', { hour: 'numeric', minute:'2-digit' });
             return `Le ${start.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} à ${startTime}`;
        }

        const end = new Date(endDate);
        if (start.toDateString() === end.toDateString()) {
             const startTime = start.toLocaleTimeString('fr-FR', { hour: 'numeric', minute:'2-digit' });
             const endTime = end.toLocaleTimeString('fr-FR', { hour: 'numeric', minute:'2-digit' });
             return `Le ${start.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} de ${startTime} à ${endTime}`;
        } else {
             const endFormatted = end.toLocaleDateString('fr-FR', options);
             return `Du ${startFormatted} au ${endFormatted}`;
        }
    }

</script>

<svelte:head>
    <title>Événements à Agadir - Visit Agadir</title>
    <meta name="description" content="Découvrez les prochains événements, festivals, marchés et concerts à Agadir." />
</svelte:head>

<!-- Ajout de content-padding -->
<div class="events-page content-padding">
    <h1>Événements à Venir à Agadir</h1>

    {#if loading}
        <LoadingSpinner />
    {:else if pageError}
        <ErrorMessage message={pageError} /> <!-- Affiche l'erreur si elle existe -->
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

                        <!-- MODIFIÉ : Logique pour afficher le lieu -->
                        {#if event.location_name}
                            <p class="event-location">
                                <strong>Lieu :</strong>
                                {#if event.place_id}
                                    <!-- Si place_id existe, crée un lien vers la page du lieu -->
                                    <a href="/places/{event.place_id}" class="location-link">{event.location_name}</a>
                                {:else}
                                    <!-- Sinon, affiche juste le nom du lieu -->
                                    {event.location_name}
                                {/if}
                            </p>
                        {/if}
                        <!-- FIN MODIFICATION Lieu -->

                        {#if event.description}
                            <p class="event-description">{event.description}</p>
                        {/if}

                        <!-- NOUVEAU : Affichage conditionnel du lien Ticket/Site -->
                        {#if event.ticket_url}
                            <a href={event.ticket_url} target="_blank" rel="noopener noreferrer" class="ticket-link">
                                Tickets / Infos <ExternalLink size={16} style="display:inline-block; vertical-align: middle; margin-left: 4px;" />
                            </a>
                        {/if}
                        <!-- FIN NOUVEAU Lien Ticket -->

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

     /* Style pour le padding global */
    .content-padding {
        padding-left: var(--padding-global, 1rem);
        padding-right: var(--padding-global, 1rem);
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    h1 {
        color: var(--primary-color, #007bff); /* Couleur standard */
        margin-top: 0;
        margin-bottom: 1.5rem;
        text-align: center;
        border-bottom: 2px solid var(--primary-color, #007bff);
        padding-bottom: 0.5rem;
    }

    .events-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .event-item {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 3px 12px rgba(0,0,0,0.08); /* Ombre plus douce */
        margin-bottom: 2rem;
        overflow: hidden;
    }

    @media (min-width: 768px) {
        .event-item {
            flex-direction: row;
        }
    }

    .event-image {
        width: 100%;
        max-width: 300px;
        height: 200px;
        object-fit: cover;
        border-radius: 6px;
        align-self: center;
    }
     @media (min-width: 768px) {
        .event-image {
             width: 30%; /* Ajustement largeur */
             height: auto;
             max-width: 250px; /* Réduction max width */
             align-self: flex-start;
        }
     }


    .event-details {
        flex: 1;
        display: flex; /* Ajout pour mieux gérer l'espacement vertical */
        flex-direction: column;
    }

    .event-details h2 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: var(--secondary-color, #333);
        font-size: 1.5rem;
    }

    .category-badge {
        display: inline-block;
        background-color: #e9ecef; /* Fond neutre */
        color: #495057;
        padding: 0.2em 0.7em;
        border-radius: 0.25rem;
        font-size: 0.8em;
        font-weight: 500; /* Moins gras */
        margin-bottom: 0.8rem;
        align-self: flex-start; /* Pour qu'il ne prenne pas toute la largeur */
    }

    .event-date {
        font-weight: bold;
        color: #555;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
    }
     .event-location {
         color: #666;
         font-size: 0.95rem; /* Légèrement plus grand */
         margin-bottom: 1rem;
     }
     .event-location strong {
          color: #444;
     }

     /* Style pour le lien du lieu */
     .location-link {
        color: var(--primary-color, #007bff);
        text-decoration: none;
        font-weight: 500;
     }
     .location-link:hover {
        text-decoration: underline;
     }

    .event-description {
        color: #333;
        line-height: 1.6;
        font-size: 0.95rem;
        margin-bottom: 1rem; /* Ajout espace avant lien ticket */
        flex-grow: 1; /* Permet à la description de pousser le lien en bas */
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

    /* NOUVEAU : Style pour le lien ticket */
    .ticket-link {
        display: inline-block;
        align-self: flex-start; /* Aligné à gauche */
        margin-top: auto; /* Pousse le lien en bas si description courte */
        padding: 0.5rem 1rem;
        background-color: var(--primary-color, #007bff);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-size: 0.9rem;
        font-weight: 500;
        transition: background-color 0.2s ease;
    }
    .ticket-link:hover {
        background-color: #0056b3; /* Couleur plus foncée au survol */
    }

</style>