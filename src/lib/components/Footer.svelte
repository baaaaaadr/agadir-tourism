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

        <!-- NOUVELLE SECTION : Icônes réseaux sociaux -->
        <div class="social-icons">
            {#each socialLinks as link (link.name)}
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel} title={link.name}>
                    <svelte:component this={link.icon} size={24} strokeWidth={1.5} />
                </a>
            {/each}
        </div>
        <!-- FIN NOUVELLE SECTION -->
    </div>
</footer>

<style>
    footer {
        padding: 2rem 1rem; /* Augmentation padding */
        margin-top: 3rem; /* Augmentation marge */
        background-color: #f8f9fa; /* Couleur un peu plus claire */
        color: #6c757d;
        font-size: 0.9em;
        border-top: 1px solid #dee2e6; /* Ajout bordure haute */
    }

    .footer-content {
        max-width: 1100px; /* Limite largeur contenu */
        margin: 0 auto; /* Centre le contenu */
        display: flex;
        flex-direction: column; /* Par défaut sur mobile */
        align-items: center;
        justify-content: space-between; /* Espace entre copyright et icônes */
        gap: 1.5rem; /* Espace entre les éléments */
        text-align: center;
    }

    .copyright p {
        margin: 0; /* Retire marge par défaut du paragraphe */
    }

    .social-icons {
        display: flex;
        gap: 1.2rem; /* Espace entre les icônes */
        align-items: center;
    }

    .social-icons a {
        color: #495057; /* Couleur icône */
        transition: color 0.2s ease, transform 0.2s ease;
        display: inline-block; /* Nécessaire pour transform */
    }

    .social-icons a:hover {
        color: var(--primary-color, #007bff); /* Couleur au survol */
        transform: scale(1.1); /* Léger grossissement */
    }

    /* Responsive: Mettre copyright et icônes sur la même ligne sur écrans larges */
    @media (min-width: 768px) {
        .footer-content {
            flex-direction: row; /* Passe en ligne */
            text-align: left; /* Alignement texte à gauche */
        }
         .social-icons {
            gap: 1.5rem; /* Augmente légèrement l'espace */
         }
    }
</style>