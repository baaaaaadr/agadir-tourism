<script>
    import { Home, Map, MapPin, Coffee } from 'lucide-svelte';
    import { page } from '$app/stores';

    const navItems = [
        { path: '/', label: 'Accueil', icon: Home },
        { path: '/map', label: 'Carte', icon: Map },
        { path: '/places', label: 'Lieux', icon: MapPin },
        { path: '/restaurants', label: 'Restaurants', icon: Coffee },
    ];
</script>

<nav class="bottom-nav">
    {#each navItems as item (item.path)}
        <a 
            href={item.path}
            aria-label={item.label}
            class:active={$page.url.pathname === item.path || ($page.url.pathname.startsWith(item.path) && item.path !== '/')}
        >
            <svelte:component this={item.icon} size={24} strokeWidth={1.5} />
            <span>{item.label}</span>
        </a>
    {/each}
</nav>

<style>
    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: var(--bg-secondary);
        border-top: 1px solid var(--border-color);
        box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
        z-index: 1000;
        padding-bottom: env(safe-area-inset-bottom);
    }

    .bottom-nav a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: var(--space-sm) var(--space-xs);
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.7rem;
        text-align: center;
        transition: color var(--transition-fast);
    }

    .bottom-nav a:hover {
        color: var(--text-primary);
    }

    .bottom-nav a.active {
        color: var(--ocean-blue);
        font-weight: 600;
    }

    .bottom-nav a span {
        margin-top: 2px;
        line-height: 1.2;
    }

    @media (min-width: 768px) {
        .bottom-nav {
            display: none;
        }
    }
</style>
