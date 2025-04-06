<script>
    // Pas de script nécessaire pour une page statique
</script>

<svelte:head>
    <title>À Propos d'Agadir - Visit Agadir</title>
    <meta name="description" content="Découvrez l'histoire et les charmes de la ville d'Agadir." />
</svelte:head>

<div class="about-page">
    <h1>À Propos d'Agadir</h1>

    <img src="/assets/images/default-placeholder.jpg" alt="Paysage d'Agadir" class="about-image">
    <!-- REMPLACE l'image ci-dessus par une belle image d'Agadir si tu en as une -->

    <p>
        Agadir, capitale de la région Souss-Massa, est l'une des principales destinations touristiques du Maroc. Reconnue pour sa magnifique baie, sa longue plage de sable fin et son climat agréable toute l'année, la ville offre un mélange unique de modernité et de traditions.
    </p>

    <h2>Une Ville Reconstruite</h2>
    <p>
        Tragiquement détruite par un tremblement de terre dévastateur en 1960, Agadir a été entièrement reconstruite un peu plus au sud de l'épicentre. Cette reconstruction a donné naissance à une ville moderne, aux larges avenues et à l'architecture contemporaine, tout en préservant l'esprit chaleureux marocain. Les ruines de l'ancienne Kasbah d'Agadir Oufella, perchées sur une colline, témoignent de ce passé et offrent un panorama spectaculaire sur la ville nouvelle et l'océan Atlantique.
    </p>

    <h2>Attractions et Activités</h2>
    <p>
        Aujourd'hui, Agadir attire les visiteurs par sa plage animée, idéale pour la détente et les sports nautiques. La Marina moderne propose des restaurants, des cafés et des boutiques. Le Souk El Had, l'un des plus grands marchés du Maroc, est une étape incontournable pour s'immerger dans les couleurs, les senteurs et l'artisanat local. Les environs d'Agadir offrent également des possibilités d'excursions vers la Vallée du Paradis, les plages de Taghazout (réputées pour le surf) ou le Parc National de Souss-Massa.
    </p>

     <h2>Culture et Hospitalité</h2>
    <p>
        Agadir est aussi un carrefour de la culture Amazigh (berbère), dont vous pourrez découvrir les richesses au Musée du Patrimoine Amazigh. L'hospitalité légendaire des habitants d'Agadir rendra votre séjour encore plus mémorable.
    </p>

    <p>
        Cette application a pour but de vous aider à découvrir les trésors de notre belle ville. Bon séjour à Agadir !
    </p>

</div>

<style>
    .about-page {
        background-color: #fff;
        padding: 1.5rem 2rem; /* Un peu plus de padding horizontal */
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-width: 850px;
        margin: 1rem auto;
        line-height: 1.8; /* Améliore la lisibilité */
    }

    h1 {
        color: #0077cc;
        margin-top: 0;
        margin-bottom: 1rem;
        text-align: center;
    }

     .about-image {
        width: 100%;
        max-height: 350px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 2rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
     }

    h2 {
        color: #005fa3;
        margin-top: 2rem;
        margin-bottom: 0.8rem;
        border-bottom: 1px solid #eee;
        padding-bottom: 0.4rem;
    }

    p {
        margin-bottom: 1.2rem;
        color: #333;
        text-align: justify; /* Justifie le texte pour un look plus propre */
    }
</style>