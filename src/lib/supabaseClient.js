import { createClient } from '@supabase/supabase-js';

// Récupère les variables d'environnement (méthode SvelteKit standard)
// Tu devras créer un fichier .env à la racine du projet pour stocker ces clés
// Fichier .env (NE PAS COMMITTER CE FICHIER S'IL CONTIENT DES CLÉS SECRÈTES)
// PUBLIC_SUPABASE_URL=TON_URL_SUPABASE
// PUBLIC_SUPABASE_ANON_KEY=TA_CLE_ANON_SUPABASE

// Utilise import.meta.env pour Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérification simple
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erreur: Variables d'environnement Supabase manquantes.");
  console.error("Assurez-vous d'avoir un fichier .env avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY");
  // On pourrait lancer une erreur plus formelle si on veut arrêter l'app
}

// Crée et exporte le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Note importante sur la sécurité:
// La clé 'anon' est publique et conçue pour être utilisée côté client.
// La sécurité repose ENTIÈREMENT sur les Row Level Security (RLS) Policies
// que tu as définies dans Supabase. Assure-toi qu'elles sont correctes !