// src/routes/restaurants/+page.js
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export async function load() {
    console.log("Chargement de la liste des restaurants...");
    try {
        const { data: restaurants, error: restaurantsError } = await supabase
            .from('restaurants')
            .select('id, name, description, cuisine_type, price_range, image_url') // Select fields needed by RestaurantCard
            .order('name', { ascending: true }); // Order alphabetically by name

        if (restaurantsError) {
            throw restaurantsError;
        }

        console.log("Restaurants chargés:", restaurants?.length);
        return {
            restaurants: restaurants || []
        };

    } catch (err) {
        console.error("Erreur lors du chargement des restaurants:", err.message);
         throw error(500, `Impossible de charger la liste des restaurants: ${err.message}`);
    }
}