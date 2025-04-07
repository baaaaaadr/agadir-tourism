import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export async function load() {
    console.log("Chargement des événements...");

    // Date actuelle pour filtrer les événements passés
    const now = new Date().toISOString();

    try {
        // MODIFIÉ : Ajout de ticket_url et place_id dans le select
        const { data: events, error: eventsError } = await supabase
            .from('events')
            // Sélectionne toutes les colonnes existantes + les nouvelles
            .select('*, place_id, ticket_url')
            // Filtre pour les événements futurs ou en cours (même logique qu'avant)
            .or(`end_date.gte.${now},and(end_date.is.null,start_date.gte.${now}),and(start_date.lte.${now},end_date.gte.${now})`)
            .order('start_date', { ascending: true }); // Trie par date de début

        if (eventsError) {
            throw eventsError;
        }

        console.log("Événements chargés (avec place_id et ticket_url):", events);
        return {
            events: events || []
        };

    } catch (err) {
        console.error("Erreur lors du chargement des événements:", err.message);
        // S'assurer de retourner une structure de données vide en cas d'erreur pour que la page ne plante pas
        // throw error(500, `Impossible de charger les événements: ${err.message}`); // On pourrait aussi faire ça
         return {
             events: [],
             error: `Impossible de charger les événements: ${err.message}` // On passe l'erreur à la page
         };
    }
}