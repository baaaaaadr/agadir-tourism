<script>
    import { browser } from '$app/environment'; // To check for window.matchMedia
    import { themeStore } from '$lib/stores/themeStore.js'; // Import theme store
    import { Facebook, Instagram, Twitter, Youtube, Linkedin, Sun, Moon } from 'lucide-svelte'; // Added Sun, Moon icons

    // Social Links (as before)
    const socialLinks = [
        { name: 'Facebook', href: '#', icon: Facebook, ariaLabel: 'Suivez-nous sur Facebook' },
        { name: 'Instagram', href: '#', icon: Instagram, ariaLabel: 'Suivez-nous sur Instagram' },
        { name: 'Twitter', href: '#', icon: Twitter, ariaLabel: 'Suivez-nous sur Twitter (X)' },
        { name: 'YouTube', href: '#', icon: Youtube, ariaLabel: 'Suivez-nous sur YouTube' },
    ];

    // --- Theme Toggle Logic ---
    let isCurrentlyDark = false; // Reactive variable to show the correct icon

    // Function to determine the effective theme (resolves 'system')
    function getEffectiveTheme(themeValue) {
        if (themeValue === 'system') {
            if (browser) {
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            return 'light'; // Default assumption for SSR or if matchMedia fails
        }
        return themeValue; // 'light' or 'dark'
    }

    // Reactive statement to update the icon based on the effective theme
    $: isCurrentlyDark = getEffectiveTheme($themeStore) === 'dark';

    function handleThemeToggle() {
        themeStore.toggle();
    }
    // --- End Theme Toggle Logic ---

</script>

<footer>
    <div class="footer-content">
        <div class="copyright">
            <p>© {new Date().getFullYear()} Office du Tourisme Agadir (Maquette PWA). Tous droits réservés.</p>
        </div>

        <div class="footer-controls"> <!-- Wrapper for social + theme -->
            <!-- Social Icons -->
            <div class="social-icons">
                {#each socialLinks as link (link.name)}
                    <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel} title={link.name} class="social-link">
                        <svelte:component this={link.icon} size={22} strokeWidth={1.5} />
                    </a>
                {/each}
            </div>

            <!-- Theme Toggle Button -->
            <button
                class="theme-toggle-button"
                on:click={handleThemeToggle}
                aria-label={isCurrentlyDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
                title={isCurrentlyDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
            >
                {#if isCurrentlyDark}
                    <Sun size={20} />
                {:else}
                    <Moon size={20} />
                {/if}
            </button>
        </div>

    </div>
</footer>

<style>
    footer {
        padding: var(--space-lg) var(--space-md); /* Adjusted padding */
        margin-top: var(--space-xxl);
        background-color: var(--bg-secondary);
        color: var(--text-secondary);
        font-size: 0.9em;
        border-top: 1px solid var(--border-color);
        transition: background-color var(--transition-normal), border-color var(--transition-normal); /* Add transition */
    }

    .footer-content {
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        flex-direction: column; /* Stack copyright and controls on mobile */
        align-items: center;
        justify-content: space-between;
        gap: var(--space-md); /* Reduced gap for mobile */
        text-align: center;
    }

    .copyright p {
        margin: 0;
    }

    /* New wrapper for controls */
    .footer-controls {
        display: flex;
        align-items: center;
        gap: var(--space-lg); /* Space between social icons and theme toggle */
    }

    .social-icons {
        display: flex;
        gap: var(--space-md);
        align-items: center;
    }

    .social-link { /* Renamed class for clarity */
        color: var(--text-secondary);
        transition: color var(--transition-normal), transform var(--transition-normal);
        display: inline-block;
    }

    .social-link:hover {
        color: var(--ocean-blue); /* Use primary color on hover */
        transform: scale(1.15); /* Slightly larger scale */
    }

    /* Theme Toggle Button Styles */
    .theme-toggle-button {
        background: none;
        border: 1px solid var(--border-color); /* Subtle border */
        color: var(--text-secondary);
        cursor: pointer;
        padding: var(--space-sm); /* Make it a bit larger */
        border-radius: var(--radius-full); /* Keep it round */
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color var(--transition-normal), color var(--transition-normal), border-color var(--transition-normal), transform var(--transition-fast);
    }

    .theme-toggle-button:hover {
        background-color: var(--sandy-beige-light); /* Use theme color */
        color: var(--text-primary);
        border-color: var(--sandy-beige-dark);
        transform: scale(1.1);
    }
     /* Specific hover for dark mode */
     :global([data-theme="dark"]) .theme-toggle-button:hover {
         background-color: var(--sandy-beige-dark); /* Darker hover */
         border-color: var(--sandy-beige-light);
     }


    /* Responsive */
    @media (min-width: 768px) {
        .footer-content {
            flex-direction: row; /* Side-by-side layout on larger screens */
            text-align: left;
            gap: var(--space-lg);
        }
         .footer-controls {
             gap: var(--space-xl); /* More space on desktop */
         }
         .social-icons {
            gap: var(--space-lg);
         }
    }
</style>