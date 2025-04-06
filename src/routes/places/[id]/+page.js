import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    // params.id contient la valeur de [id] dans l'URL
    const placeId = params.id;
    console.log(`Chargement du lieu avec ID: ${placeId}`);

    // Vérifie si l'ID est valide (basique)
    if (!placeId || isNaN(parseInt(placeId))) {
        throw error(400, 'ID de lieu invalide'); // Bad Request
    }

    try {
        const { data: place, error: placeError } = await supabase
            .from('places')
            .select('*') // Sélectionne toutes les colonnes pour le détail
            .eq('id', parseInt(placeId)) // Trouve la correspondance exacte de l'ID
            .single(); // .single() retourne un seul objet ou null, et une erreur si plusieurs lignes correspondent

        if (placeError) {
            // Si l'erreur est "PGRST116: JSON object requested, multiple (or no) rows returned"
            // C'est que l'ID n'existe pas
            if (placeError.code === 'PGRST116') {
                 throw error(404, 'Lieu non trouvé'); // Not Found
            }
            // Pour les autres erreurs Supabase
            throw placeError;
        }

        if (!place) {
             throw error(404, 'Lieu non trouvé'); // Not Found (au cas où .single() retourne null sans erreur)
        }

        console.log("Lieu trouvé:", place);
        return {
            place // Retourne l'objet place
        };

    } catch (err) {
        // Attrape les erreurs lancées (404, 500, etc.)
        if (err.status) { // Si c'est une erreur HTTP lancée par `error()`
             throw err;
        } else { // Sinon, c'est une autre erreur serveur/Supabase
            console.error(`Erreur lors du chargement du lieu ${placeId}:`, err.message);
            throw error(500, `Impossible de charger les détails du lieu: ${err.message}`);
        }
    }
}