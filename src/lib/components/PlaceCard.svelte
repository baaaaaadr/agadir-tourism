<script>
    export let place;

    // Chemin vers l'image par défaut
    const defaultImage = '/assets/images/default-placeholder.jpg';
</script>

<a href="/places/{place.id}" class="card-link">
    <article class="card">
        <img
            src={place.image_url || defaultImage}
            alt="Image de {place.name}"
            class="card-image"
            loading="lazy"
            onerror="this.onerror=null; this.src='{defaultImage}';"
        />
        <div class="card-content">
            <h3>{place.name}</h3>
            {#if place.category}
                <span class="category-badge">{place.category}</span>
            {/if}
            {#if place.description}
                <p>{place.description.substring(0, 100)}{place.description.length > 100 ? '...' : ''}</p>
            {/if}
        </div>
    </article>
</a>

<style>
    .card-link {
        text-decoration: none;
        color: inherit;
        display: block; /* Pour que le lien prenne toute la place de la carte */
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        border-radius: 8px;
        overflow: hidden; /* Pour que l'image respecte le border-radius */
    }
    .card-link:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0,0,0,0.15);
    }

    .card {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%; /* Assure que les cartes dans une grille ont la même hauteur */
    }

    .card-image {
        width: 100%;
        height: 180px; /* Hauteur fixe pour l'image */
        object-fit: cover; /* Assure que l'image couvre la zone sans se déformer */
    }

    .card-content {
        padding: 1rem;
        flex-grow: 1; /* Permet au contenu de prendre l'espace restant */
    }

    h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        color: #005fa3;
    }

    .category-badge {
        display: inline-block;
        background-color: #e2e3e5;
        color: #495057;
        padding: 0.2em 0.6em;
        border-radius: 0.25rem;
        font-size: 0.8em;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 0.95rem;
        color: #555;
        margin-bottom: 0; /* Enlève marge basse du paragraphe */
    }
</style>