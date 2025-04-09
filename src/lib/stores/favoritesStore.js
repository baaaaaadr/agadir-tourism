// src/lib/stores/favoritesStore.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// The key used to store favorites in localStorage
const STORAGE_KEY = 'agadir-pwa-favorites';

/**
 * Represents a favorite item.
 * @typedef {object} FavoriteItem
 * @property {string} id - The unique ID of the place or restaurant.
 * @property {'place' | 'restaurant'} type - The type of the item.
 * @property {string} [name] - Optional: Name, could be added for easier debugging or future use
 * @property {number} [addedAt] - Optional: Timestamp when added
 */

/**
 * Function to load favorites from localStorage.
 * Ensures it only runs in the browser.
 * @returns {FavoriteItem[]} The array of favorite items.
 */
function loadFavorites() {
    if (!browser) {
        return []; // Return empty array during SSR
    }
    try {
        const storedFavorites = localStorage.getItem(STORAGE_KEY);
        if (storedFavorites) {
            // Basic validation: check if it's an array
            const parsed = JSON.parse(storedFavorites);
            return Array.isArray(parsed) ? parsed : [];
        }
    } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
        // Optionally clear corrupted data: localStorage.removeItem(STORAGE_KEY);
    }
    return []; // Return empty array if nothing stored or error
}

// Create the writable store, initializing it with data from localStorage
const initialFavorites = loadFavorites();
const { subscribe, set, update } = writable(initialFavorites);

// Subscribe to store changes and update localStorage
// This ensures localStorage stays in sync with the store's state
subscribe(currentFavorites => {
    if (browser) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentFavorites));
            // console.log("Favorites saved to localStorage:", currentFavorites); // For debugging
        } catch (error) {
            console.error("Error saving favorites to localStorage:", error);
        }
    }
});

/**
 * Adds an item to favorites.
 * @param {'place' | 'restaurant'} type - The type of the item.
 * @param {string} id - The ID of the item.
 * @param {string} [name] - Optional name for context.
 */
function addFavorite(type, id, name = '') {
    update(favorites => {
        // Avoid duplicates
        if (!favorites.some(fav => fav.id === id && fav.type === type)) {
            const newItem = {
                id,
                type,
                name, // Store name if provided
                addedAt: Date.now()
            };
            console.log('Adding favorite:', newItem);
            return [...favorites, newItem];
        }
        return favorites; // Return unchanged if already exists
    });
}

/**
 * Removes an item from favorites.
 * @param {'place' | 'restaurant'} type - The type of the item.
 * @param {string} id - The ID of the item.
 */
function removeFavorite(type, id) {
    update(favorites => {
         console.log('Removing favorite:', { type, id });
        return favorites.filter(fav => !(fav.id === id && fav.type === type));
    });
}

/**
 * Checks if an item is currently favorited.
 * This function is useful but often you'll check directly against the store value ($favoritesStore)
 * @param {'place' | 'restaurant'} type - The type of the item.
 * @param {string} id - The ID of the item.
 * @returns {boolean} True if the item is favorited, false otherwise.
 */
function isFavorite(type, id, currentFavorites) {
    // Pass the current store value ($favoritesStore) to this for reactivity
    return currentFavorites.some(fav => fav.id === id && fav.type === type);
}

// Export the store and the actions
export const favoritesStore = {
    subscribe,
    add: addFavorite,
    remove: removeFavorite,
    // You could directly use $favoritesStore.some(...) in components instead of exporting isFavorite
};

// You might also want to export isFavorite if you prefer that pattern,
// but remember it needs the current store value passed to it to be reactive.
// Example of reactive check in component: $: isFav = $favoritesStore.some(f => f.id === itemId && f.type === itemType)