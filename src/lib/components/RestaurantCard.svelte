<script>
    export let restaurant;
    const defaultImage = '/assets/images/default-placeholder.jpg';
</script>

<a href="/restaurants/{restaurant.id}" class="card-link">
    <article class="card">
        <img
            src={restaurant.image_url || defaultImage}
            alt="Image de {restaurant.name}"
            class="card-image"
            loading="lazy"
            onerror="this.onerror=null; this.src='{defaultImage}';"
        />
        <div class="card-content">
            <h3>{restaurant.name}</h3>
            {#if restaurant.cuisine_type || restaurant.price_range}
                 <div class="badges">
                     {#if restaurant.cuisine_type}
                        <span class="category-badge cuisine">{restaurant.cuisine_type}</span>
                     {/if}
                     {#if restaurant.price_range}
                        <span class="category-badge price">{restaurant.price_range}</span>
                     {/if}
                 </div>
            {/if}
            {#if restaurant.description}
                <p>{restaurant.description.substring(0, 100)}{restaurant.description.length > 100 ? '...' : ''}</p>
            {/if}
        </div>
    </article>
</a>

<style>
    /* Styles très similaires à PlaceCard.svelte */
    .card-link {
        text-decoration: none;
        color: inherit;
        display: block;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        border-radius: 8px;
        overflow: hidden;
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
        height: 100%;
    }
    .card-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }
    .card-content {
        padding: 1rem;
        flex-grow: 1;
    }
    h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        color: #005fa3;
    }
    .badges {
        margin-bottom: 0.7rem;
    }
    .category-badge {
        display: inline-block;
        background-color: #e2e3e5;
        color: #495057;
        padding: 0.2em 0.6em;
        border-radius: 0.25rem;
        font-size: 0.8em;
        margin-right: 0.4rem; /* Espace entre les badges */
    }
     .category-badge.price {
        background-color: #d1ecf1; /* Couleur différente pour le prix */
        color: #0c5460;
    }
    p {
        font-size: 0.95rem;
        color: #555;
        margin-bottom: 0;
    }
</style>