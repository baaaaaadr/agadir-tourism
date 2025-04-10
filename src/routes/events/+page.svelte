<script lang="ts">
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import ErrorMessage from '$lib/components/ErrorMessage.svelte';
    import { ExternalLink, MapPin } from 'lucide-svelte'; // Added MapPin icon
    import { navigating } from '$app/stores'; // For loading state
    import { fly } from 'svelte/transition';

    export let data;
    $: events = data?.events || [];
    $: pageError = data?.error;
    $: isLoading = !data || ($navigating && $navigating.to?.route.id === '/events'); // Show loading initially or during navigation

    const defaultImage = '/assets/images/default-placeholder.jpg'; // Default event image

    function formatEventDate(startDate: string | null | undefined, endDate: string | null | undefined): string {
        if (!startDate) return "Date inconnue";

        const start = new Date(startDate);
        // Simplified options for brevity on card
        const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const shortDateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }; // For multi-day
        const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false }; // Use 24h format
        const startFormattedDate = start.toLocaleDateString('fr-FR', dateOptions);
        const startFormattedTime = start.toLocaleTimeString('fr-FR', timeOptions);

        if (!endDate) {
            return `Le ${startFormattedDate} à ${startFormattedTime}`;
        }

        const end = new Date(endDate);
        const endFormattedTime = end.toLocaleTimeString('fr-FR', timeOptions);

        if (start.toDateString() === end.toDateString()) {
             // Same day event
            return `Le ${startFormattedDate}, de ${startFormattedTime} à ${endFormattedTime}`;
        } else {
            // Multi-day event
            const startShort = start.toLocaleDateString('fr-FR', shortDateOptions);
            const endShort = end.toLocaleDateString('fr-FR', shortDateOptions);
            // Check if same year for cleaner display (optional)
            if (start.getFullYear() === end.getFullYear()) {
                 return `Du ${startShort} au ${endShort} ${start.getFullYear()}`;
            } else {
                 return `Du ${startFormattedDate} au ${end.toLocaleDateString('fr-FR', dateOptions)}`;
            }
        }
    }

    function handleImageError(event: Event) {
        const imgElement = event.target as HTMLImageElement;
        if (imgElement) {
            imgElement.onerror = null;
            imgElement.src = defaultImage;
        }
    }
</script>

<svelte:head>
    <title>Événements à Agadir - Visit Agadir</title>
    <meta name="description" content="Découvrez les prochains événements, festivals, marchés et concerts à Agadir." />
</svelte:head>

<div class="list-page-container"> <!-- Re-use list page container style -->
    <h1>Événements à Venir</h1>

    {#if isLoading}
        <LoadingSpinner />
    {:else if pageError}
        <ErrorMessage message={pageError} />
    {:else if events.length > 0}
         <p>Restez informé des activités et manifestations prévues à Agadir.</p>
        <ul class="events-list">
            {#each events as event, index (event.id)}
                <li class="event-card" in:fly="{{ y: 20, duration: 300, delay: index * 50 }}">
                    <img
                        src={event.image_url || defaultImage}
                        alt="Image pour {event.name}"
                        class="event-image"
                        loading="lazy"
                        on:error={handleImageError}
                    />
                    <div class="event-details">
                        <h2>{event.name}</h2>

                         <!-- Meta Info (Date, Category) -->
                         <div class="event-meta">
                            {#if event.category}
                                <span class="category-badge">{event.category}</span>
                            {/if}
                            <span class="event-date">{formatEventDate(event.start_date, event.end_date)}</span>
                         </div>

                         <!-- Location Info -->
                        {#if event.location_name}
                            <p class="event-location">
                                <MapPin size={16} style="display: inline-block; vertical-align: text-bottom; margin-right: 4px;"/>
                                {#if event.place_id}
                                    <a href="/places/{event.place_id}" class="location-link">{event.location_name}</a>
                                {:else}
                                    {event.location_name}
                                {/if}
                            </p>
                        {/if}

                        <!-- Description -->
                        {#if event.description}
                            <p class="event-description">{event.description}</p>
                        {/if}

                        <!-- Ticket Link Button -->
                        {#if event.ticket_url}
                             <div class="event-actions">
                                <a href={event.ticket_url} target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm ticket-link"> <!-- Use button class -->
                                    Tickets / Infos <ExternalLink size={16} style="display:inline-block; vertical-align: middle; margin-left: 4px;" />
                                </a>
                             </div>
                        {/if}

                    </div>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="no-results">Aucun événement à venir trouvé pour le moment. Revenez bientôt !</p> <!-- Use no-results style -->
    {/if}
</div>

<style>
    /* Re-use list page container styles */
    .list-page-container {
        max-width: 950px; /* Slightly wider max-width for events */
        margin: 0 auto;
    }

    h1 {
        color: var(--ocean-blue-dark);
        text-align: center;
        margin-bottom: var(--space-lg);
    }

    p {
        text-align: center;
        color: var(--text-secondary);
        margin-bottom: var(--space-xl);
    }

    /* --- Event List & Card --- */
    .events-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-xl); /* Space between cards */
        transition: opacity 0.3s ease-in-out;
    }

    .event-card {
        display: flex;
        flex-direction: column; /* Mobile first: Image top, text bottom */
        background-color: var(--bg-secondary); /* Card background */
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
        overflow: hidden; /* Clip image corners */
        border: 1px solid var(--border-color);
        transition: transform var(--transition-normal), box-shadow var(--transition-normal);
    }
     .event-card:hover {
         transform: translateY(-3px);
         box-shadow: var(--shadow-lg);
     }


    /* --- Event Image --- */
    .event-image {
        width: 100%;
        height: 200px; /* Fixed height for consistency */
        object-fit: cover;
    }

    /* --- Event Details --- */
    .event-details {
        padding: var(--space-lg);
        display: flex;
        flex-direction: column;
        flex-grow: 1; /* Allow details to fill space */
    }

    .event-details h2 {
        margin-top: 0;
        margin-bottom: var(--space-sm);
        color: var(--ocean-blue-dark);
        font-size: 1.4rem; /* Slightly smaller than detail page H1 */
        line-height: 1.3;
    }

     /* --- Meta Info (Category, Date) --- */
     .event-meta {
        display: flex;
        flex-wrap: wrap; /* Allow wrapping */
        align-items: center;
        gap: var(--space-md);
        margin-bottom: var(--space-md);
        font-size: 0.9rem;
     }

     .category-badge {
        display: inline-block;
        background-color: var(--sandy-beige);
        color: var(--text-primary);
        padding: 0.3em 0.8em;
        border-radius: var(--radius-sm);
        font-weight: 500;
     }

     .event-date {
        color: var(--text-secondary);
        font-weight: 500;
        flex-shrink: 0; /* Prevent date shrinking too much */
     }


    /* --- Location --- */
    .event-location {
         color: var(--text-secondary);
         font-size: 0.95rem;
         margin-top: 0;
         margin-bottom: var(--space-md);
         display: flex; /* Align icon */
         align-items: center;
     }
     .location-link {
        color: var(--ocean-blue);
        font-weight: 500;
        text-decoration: none;
     }
     .location-link:hover {
        text-decoration: underline;
        color: var(--ocean-blue-dark);
     }

     /* --- Description --- */
    .event-description {
        color: var(--text-primary);
        line-height: 1.6;
        font-size: 0.95rem;
        margin-top: 0;
        margin-bottom: var(--space-lg); /* Space before actions */
        flex-grow: 1; /* Push actions to bottom if description is short */
    }

    /* --- Actions (Ticket Button) --- */
     .event-actions {
         margin-top: auto; /* Pushes to bottom */
         padding-top: var(--space-sm); /* Small space above button */
     }
     .ticket-link {
         /* Uses .btn .btn-primary .btn-sm styles from app.css */
          display: inline-flex; /* Align icon */
          align-items: center;
     }


    /* --- Responsive Layout (Larger Screens) --- */
    @media (min-width: 768px) {
        .event-card {
            flex-direction: row; /* Image left, text right */
            align-items: flex-start; /* Align items top */
        }
        .event-image {
            width: 250px; /* Fixed width for image */
            height: auto; /* Auto height based on width */
            min-height: 180px; /* Ensure a minimum height */
            flex-shrink: 0; /* Prevent image shrinking */
             border-radius: var(--radius-md) 0 0 var(--radius-md); /* Round left corners only */
        }
         .event-details {
             padding: var(--space-lg) var(--space-xl); /* More horizontal padding */
         }
    }

    /* --- No Results --- */
    .no-results {
        text-align: center;
        font-style: italic;
        color: var(--text-secondary);
        margin-top: var(--space-lg);
        padding: var(--space-xl);
        background-color: var(--sandy-beige-light);
        border-radius: var(--radius-md);
        transition: opacity 0.3s ease-in-out;
    }
</style>