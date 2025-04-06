import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit'; // Pour gérer les erreurs de chargement

// Nombre d'éléments à afficher par catégorie sur l'accueil (pour ne pas tout charger)
const HOME_PAGE_LIMIT = 6;

export async function load() {
    console.log("Chargement des données pour la page d'accueil...");
    try {
        // Fetch les N premières places (triées par nom, par exemple)
        const { data: places, error: placesError } = await supabase
            .from('places')
            .select('id, name, description, category, image_url') // Sélectionne les champs nécessaires pour la carte
            .order('name', { ascending: true })
            .limit(HOME_PAGE_LIMIT);

        if (placesError) throw placesError; // Lance l'erreur si Supabase échoue

        // Fetch les N premiers restaurants
        const { data: restaurants, error: restaurantsError } = await supabase
            .from('restaurants')
            .select('id, name, description, cuisine_type, price_range, image_url')
            .order('name', { ascending: true })
            .limit(HOME_PAGE_LIMIT);

        if (restaurantsError) throw restaurantsError;

        console.log("Données chargées :", { places, restaurants });

        // Retourne les données qui seront disponibles dans +page.svelte via la prop 'data'
        return {
            places: places || [],
            restaurants: restaurants || []
        };

    } catch (err) {
        console.error("Erreur lors du chargement des données d'accueil:", err.message);
        // Retourne une erreur que le layout peut attraper et afficher
        throw error(500, `Impossible de charger les données depuis Supabase: ${err.message}`);
    }
}