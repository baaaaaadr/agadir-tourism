import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export async function load() {
    console.log("Chargement des données pour la page carte...");
    try {
        // Fetch TOUTES les places avec coordonnées valides
        const { data: places, error: placesError } = await supabase
            .from('places')
            .select('id, name, latitude, longitude, category') // Seulement les infos nécessaires pour les marqueurs
            .not('latitude', 'is', null) // Ne prend que ceux qui ont une latitude
            .not('longitude', 'is', null); // et une longitude

        if (placesError) throw placesError;

        // Fetch TOUS les restaurants avec coordonnées valides
        const { data: restaurants, error: restaurantsError } = await supabase
            .from('restaurants')
            .select('id, name, latitude, longitude, cuisine_type')
            .not('latitude', 'is', null)
            .not('longitude', 'is', null);

        if (restaurantsError) throw restaurantsError;

        console.log("Données carte chargées:", { places, restaurants });

        // Combine et formate les données pour les marqueurs de la carte
        const markersData = [
            ...(places || []).map(p => ({
                id: `place-${p.id}`,
                lat: p.latitude,
                lon: p.longitude,
                // Texte simple pour le popup, lien vers la page détail
                popupText: `<b>${p.name}</b><br>${p.category || ''}<br><a href="/places/${p.id}">Voir détails</a>`,
                type: 'place' // Pour différencier si besoin (couleur marqueur...)
            })),
            ...(restaurants || []).map(r => ({
                 id: `resto-${r.id}`,
                lat: r.latitude,
                lon: r.longitude,
                popupText: `<b>${r.name}</b><br>${r.cuisine_type || ''}<br><a href="/restaurants/${r.id}">Voir détails</a>`,
                type: 'restaurant'
            }))
        ];

        return {
            markers: markersData
        };

    } catch (err) {
        console.error("Erreur lors du chargement des données carte:", err.message);
        throw error(500, `Impossible de charger les données pour la carte: ${err.message}`);
    }
}