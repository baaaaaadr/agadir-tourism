import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const restaurantId = params.id;
    console.log(`Chargement du restaurant avec ID: ${restaurantId}`);

    if (!restaurantId || isNaN(parseInt(restaurantId))) {
        throw error(400, 'ID de restaurant invalide');
    }

    try {
        const { data: restaurant, error: restaurantError } = await supabase
            .from('restaurants') // Change la table ici
            .select('*')
            .eq('id', parseInt(restaurantId))
            .single();

        if (restaurantError) {
            if (restaurantError.code === 'PGRST116') {
                 throw error(404, 'Restaurant non trouvé');
            }
            throw restaurantError;
        }

        if (!restaurant) {
             throw error(404, 'Restaurant non trouvé');
        }

         console.log("Restaurant trouvé:", restaurant);
        return {
            restaurant // Retourne l'objet restaurant
        };

    } catch (err) {
         if (err.status) {
             throw err;
        } else {
            console.error(`Erreur lors du chargement du restaurant ${restaurantId}:`, err.message);
            throw error(500, `Impossible de charger les détails du restaurant: ${err.message}`);
        }
    }
}