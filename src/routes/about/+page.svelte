<script>
    // Pas de script nÃ©cessaire pour une page statique

     // Placeholder for hero image - replace with a real image path later
    const aboutImageUrl = '/assets/images/xplore-agadir-logo-full.png'; 
</script>

<svelte:head>
    <title>À Propos d'Agadir - Visit Agadir</title>
    <meta name="description" content="Découvrez l'histoire et les charmes de la ville d'Agadir." />
</svelte:head>

<div class="static-page-container about-page"> <!-- Add common container class -->
    <h1>À Propos d'Agadir</h1>

    <img src={aboutImageUrl} alt="Xplore Agadir Logo" class="about-logo-img" />

    <section>
        <p>
            Agadir, capitale de la région Souss-Massa, est l'une des principales destinations touristiques du Maroc. Reconnue pour sa magnifique baie, sa longue plage de sable fin et son climat agréable toute l'année, la ville offre un mélange unique de modernité et de traditions.
        </p>
    </section>

    <section>
        <h2>Une Ville Reconstruite</h2>
        <p>
            Tragiquement détruite par un tremblement de terre dévastateur en 1960, Agadir a été entièrement reconstruite un peu plus au sud de l'épicentre. Cette reconstruction a donné naissance à une ville moderne, aux larges avenues et à l'architecture contemporaine, tout en préservant l'esprit chaleureux marocain. Les ruines de l'ancienne Kasbah d'Agadir Oufella, perchées sur une colline, témoignent de ce passé et offrent un panorama spectaculaire sur la ville nouvelle et l'océan Atlantique.
        </p>
    </section>

    <section>
        <h2>Attractions et Activités</h2>
        <p>
            Aujourd'hui, Agadir attire les visiteurs par sa plage animée, idéale pour la détente et les sports nautiques. La Marina moderne propose des restaurants, des cafés et des boutiques. Le Souk El Had, l'un des plus grands marchés du Maroc, est une étape incontournable pour s'immerger dans les couleurs, les senteurs et l'artisanat local. Les environs d'Agadir offrent également des possibilités d'excursions vers la Vallée du Paradis, les plages de Taghazout (réputées pour le surf) ou le Parc National de Souss-Massa.
        </p>
    </section>

    <section>
         <h2>Culture et Hospitalité</h2>
        <p>
            Agadir est aussi un carrefour de la culture Amazigh (berbère), dont vous pourrez découvrir les richesses au Musée du Patrimoine Amazigh. L'hospitalité légendaire des habitants d'Agadir rendra votre séjour encore plus mémorable.
        </p>
    </section>

    <section class="closing-section">
        <p>
            Cette application a pour but de vous aider à découvrir les trésors de notre belle ville. Bon séjour à Agadir !
        </p>
    </section>

</div>

<style>
    /* Common styles for static pages could eventually be global */
    .static-page-container {
        max-width: 850px; /* Limit width for readability */
        margin: 0 auto; /* Center */
        padding: var(--space-md) 0 var(--space-xxl); /* Vertical padding, no horizontal (let parent handle) */
    }

    h1 {
        color: var(--ocean-blue-dark);
        text-align: center;
        margin-bottom: var(--space-xl);
    }

    .about-logo-img {
        display: block;
        max-width: 300px;
        height: auto;
        margin: var(--space-lg) auto var(--space-xl);
    }

    section {
        margin-bottom: var(--space-lg); /* Space between text sections */
    }

    h2 {
        color: var(--ocean-blue); /* Use primary color for subtitles */
        margin-top: var(--space-xl); /* More space above H2 */
        margin-bottom: var(--space-md);
        font-size: 1.6rem;
        border-bottom: 1px solid var(--sandy-beige-dark); /* Use theme border color */
        padding-bottom: var(--space-sm);
    }

    p {
        margin-bottom: var(--space-md);
        color: var(--text-primary); /* Use theme text color */
        line-height: 1.8; /* Improve readability */
        text-align: justify; /* Justify text */
    }

    .closing-section p {
        text-align: center; /* Center the final paragraph */
        font-style: italic;
        color: var(--text-secondary);
        margin-top: var(--space-xl);
    }

    /* Remove old specific styles if they conflict */
    /* Example: Remove background-color, padding from .about-page if handled by .static-page-container */
     .about-page {
         /* Specific styles for about page if needed, otherwise remove */
     }
</style>