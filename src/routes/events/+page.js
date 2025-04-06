import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export async function load() {
    console.log("Chargement des événements...");

    // Date actuelle pour filtrer les événements passés
    const now = new Date().toISOString();

    try {
        const { data: events, error: eventsError } = await supabase
            .from('events')
            .select('*') // Prend toutes les infos pour l'instant
            // Filtre : prend les événements dont la date de fin est future
            // OU (si pas de date de fin) dont la date de début est future
            // OU ceux qui ont commencé mais ne sont pas encore finis
            .or(`end_date.gte.${now},and(end_date.is.null,start_date.gte.${now}),and(start_date.lte.${now},end_date.gte.${now})`)
            // .gte('start_date', now) // Ancienne condition plus simple: ne prend que ceux qui commencent dans le futur
            .order('start_date', { ascending: true }); // Trie par date de début

        if (eventsError) {
            throw eventsError;
        }

        console.log("Événements chargés:", events);
        return {
            events: events || []
        };

    } catch (err) {
        console.error("Erreur lors du chargement des événements:", err.message);
        throw error(500, `Impossible de charger les événements: ${err.message}`);
    }
}