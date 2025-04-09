// src/routes/places/+page.js
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export async function load() {
    console.log("Chargement de la liste des lieux...");
    try {
        const { data: places, error: placesError } = await supabase
            .from('places')
            .select('id, name, description, category, image_url') // Select fields needed by PlaceCard
            .order('name', { ascending: true }); // Order alphabetically by name

        if (placesError) {
            throw placesError;
        }

        console.log("Lieux chargés:", places?.length);
        return {
            places: places || []
        };

    } catch (err) {
        console.error("Erreur lors du chargement des lieux:", err.message);
         throw error(500, `Impossible de charger la liste des lieux: ${err.message}`);
    }
}