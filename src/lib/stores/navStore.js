// src/lib/stores/navStore.js
import { writable } from 'svelte/store';

/**
 * Contrôle l'état d'ouverture/fermeture du menu latéral (SideNav).
 * @type {import('svelte/store').Writable<boolean>}
 */
export const isSideNavOpen = writable(false); // Par défaut, le menu est fermé