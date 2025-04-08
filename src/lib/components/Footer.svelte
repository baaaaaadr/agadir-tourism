<script>
    // Import des icônes de réseaux sociaux depuis lucide-svelte
    import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-svelte';

    // Liste des réseaux sociaux (tu adapteras les liens '#' par les vrais URLs)
    const socialLinks = [
        { name: 'Facebook', href: '#', icon: Facebook, ariaLabel: 'Suivez-nous sur Facebook' },
        { name: 'Instagram', href: '#', icon: Instagram, ariaLabel: 'Suivez-nous sur Instagram' },
        { name: 'Twitter', href: '#', icon: Twitter, ariaLabel: 'Suivez-nous sur Twitter (X)' },
        { name: 'YouTube', href: '#', icon: Youtube, ariaLabel: 'Suivez-nous sur YouTube' },
        // Tu peux ajouter/supprimer des réseaux ici
        // { name: 'LinkedIn', href: '#', icon: Linkedin, ariaLabel: 'Suivez-nous sur LinkedIn' },
    ];
</script>

<footer>
    <div class="footer-content">
        <div class="copyright">
            <p>© {new Date().getFullYear()} Office du Tourisme Agadir (Maquette PWA). Tous droits réservés.</p>
        </div>

        <div class="social-icons">
            {#each socialLinks as link (link.name)}
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel} title={link.name}>
                    <svelte:component this={link.icon} size={24} strokeWidth={1.5} />
                </a>
            {/each}
        </div>
    </div>
</footer>

<style>
    footer {
        /* Utilisation des variables pour padding, margin, couleur fond/texte, bordure */
        padding: var(--space-xl) var(--space-md); /* 32px 16px */
        margin-top: var(--space-xxl); /* 48px */
        background-color: var(--bg-secondary); /* Fond secondaire (light-sand) */
        color: var(--text-secondary); /* Texte secondaire (medium-gray) */
        font-size: 0.9em; /* Garde la taille légèrement réduite */
        border-top: 1px solid var(--border-color); /* Bordure avec variable (sandy-beige-dark) */
    }

    .footer-content {
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-lg); /* Utilise variable (24px) */
        text-align: center;
    }

    .copyright p {
        margin: 0;
    }

    .social-icons {
        display: flex;
        gap: var(--space-md); /* Utilise variable (16px) pour mobile */
        align-items: center;
    }

    .social-icons a {
        color: var(--text-secondary); /* Utilise variable pour icônes par défaut */
        /* Garde les transitions existantes */
        transition: color var(--transition-normal), transform var(--transition-normal);
        display: inline-block;
    }

    .social-icons a:hover {
        color: var(--ocean-blue); /* Utilise la couleur primaire au survol */
        transform: scale(1.1);
    }

    /* Responsive */
    @media (min-width: 768px) {
        .footer-content {
            flex-direction: row;
            text-align: left;
        }
         .social-icons {
            gap: var(--space-lg); /* Utilise variable (24px) sur desktop */
         }
    }
</style>