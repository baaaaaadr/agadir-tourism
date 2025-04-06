// Changement ici : importe depuis adapter-static
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Changement ici : utilise adapter-static
		adapter: adapter({
			// Options par défaut pour un déploiement statique classique
			pages: 'build', // Dossier de sortie (reste 'build')
			assets: 'build', // Dossier de sortie pour les assets (reste 'build')
			fallback: 'index.html', // Important pour le routage côté client en mode SPA
			precompress: false, // Pas besoin de précompression pour Netlify
			strict: true // Recommandé : échoue le build si une page ne peut pas être pré-rendue
		}),
		alias: {
			// '$lib': './src/lib'
		},
		serviceWorker: {
			register: true
		},
		files: {
			serviceWorker: 'src/service-worker.js'
		}
        // On doit s'assurer que les pages dynamiques ([id]) peuvent être pré-rendues
        // Si le pré-rendu échoue, on peut devoir ajouter :
        // prerender: {
        //     handleHttpError: 'warn', // ou 'ignore' si nécessaire
        //     entries: ['*'] // Tente de pré-rendre toutes les pages trouvées
        // }
        // Mais essayons sans d'abord.
	}
};

export default config;