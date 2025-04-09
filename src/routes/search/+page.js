// src/routes/search/+page.js
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
    const query = url.searchParams.get('q')?.trim(); // Get the 'q' parameter from the URL

    if (!query) {
        // If no query, return empty results immediately or redirect, or show message
        return {
            query: '',
            results: [],
            message: "Veuillez entrer un terme de recherche."
        };
    }

    console.log(`Recherche pour: "${query}"`);

    try {
        // --- Search Places ---
        // Using 'or' to search in name or description.
        // 'ilike' is case-insensitive LIKE. '%' is wildcard.
        const { data: places, error: placesError } = await supabase
            .from('places')
            .select('id, name, description, category, image_url') // Fields for PlaceCard
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .limit(20); // Limit results per type

        if (placesError) throw placesError;

        // --- Search Restaurants ---
        const { data: restaurants, error: restaurantsError } = await supabase
            .from('restaurants')
            .select('id, name, description, cuisine_type, price_range, image_url') // Fields for RestaurantCard
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            // Optional: search cuisine_type too
            // .or(`name.ilike.%${query}%,description.ilike.%${query}%,cuisine_type.ilike.%${query}%`)
            .limit(20);

        if (restaurantsError) throw restaurantsError;

        // Combine results, adding a 'type' property
        const combinedResults = [
            ...(places || []).map(p => ({ ...p, type: 'place' })),
            ...(restaurants || []).map(r => ({ ...r, type: 'restaurant' }))
        ];

         // Optional: Sort combined results by name
         combinedResults.sort((a, b) => a.name.localeCompare(b.name));

        console.log(`Résultats trouvés: ${combinedResults.length}`);

        return {
            query,
            results: combinedResults
        };

    } catch (err) {
        console.error(`Erreur lors de la recherche pour "${query}":`, err.message);
        throw error(500, `Erreur lors de la recherche: ${err.message}`);
        // Or return error state:
        // return { query, results: [], error: `Erreur lors de la recherche: ${err.message}` };
    }
}