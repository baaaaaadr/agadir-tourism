import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    // Ajoute ceci si tu rencontres des problèmes avec Leaflet et le SSR (Server Side Rendering)
    // pendant le développement. Cela force Leaflet à être traité côté client.
    optimizeDeps: {
       exclude: ['leaflet']
    }
});