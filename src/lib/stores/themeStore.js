// src/lib/stores/themeStore.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Type definition for theme values
/** @typedef {'light' | 'dark' | 'system'} Theme */

const STORAGE_KEY = 'agadir-pwa-theme';

/**
 * Gets the initial theme value to be used by the store.
 * Checks localStorage first, then defaults to 'system'.
 * 'system' allows CSS media queries to handle the initial state.
 * @returns {Theme}
 */
function getInitialTheme() {
    if (!browser) {
        return 'system'; // Default to system for SSR, CSS will handle based on media query initially
    }

    // 1. Check localStorage for a user preference ('light', 'dark', or 'system')
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system')) {
        // console.log('Theme loaded from localStorage:', storedTheme);
        return storedTheme;
    }

    // 2. If no valid theme in storage, default to 'system'
    // console.log('No valid theme in localStorage, defaulting to system.');
    return 'system';
}

// --- Store Creation ---
const initialTheme = getInitialTheme();
const theme = writable(initialTheme); // Initialize with 'light', 'dark', or 'system'

// --- Store Actions ---

/**
 * Sets the theme explicitly and updates localStorage.
 * @param {Theme} newTheme
 */
function setTheme(newTheme) {
    if (newTheme === 'light' || newTheme === 'dark' || newTheme === 'system') {
        theme.set(newTheme);
        // console.log('Theme set to:', newTheme);
    } else {
        console.warn('Invalid theme value provided:', newTheme);
    }
}

/**
 * Toggles between light and dark themes.
 * If current theme is 'system', it checks the actual system preference
 * to decide whether to switch to light or dark, saving the explicit choice.
 */
function toggleTheme() {
    theme.update(currentTheme => {
        let actualCurrentTheme = currentTheme;

        // Resolve 'system' to actual theme based on media query *before* toggling
        if (currentTheme === 'system' && browser) {
            actualCurrentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        // Toggle between light and dark, overriding 'system'
        const newTheme = actualCurrentTheme === 'dark' ? 'light' : 'dark';
        // console.log('Theme toggled to:', newTheme);
        return newTheme; // Explicitly return 'light' or 'dark'
    });
}

// --- Persistence ---
// Subscribe to theme changes to save to localStorage
if (browser) {
    theme.subscribe(value => {
        try {
            // Always save the current value ('light', 'dark', or 'system')
            localStorage.setItem(STORAGE_KEY, value);
            // console.log('Theme saved to localStorage:', value);
        } catch (error) {
            console.error('Failed to save theme to localStorage:', error);
        }
    });
}


// --- Export Store and Actions ---
export const themeStore = {
    subscribe: theme.subscribe,
    set: setTheme,
    toggle: toggleTheme,
};

// --- Helper to apply theme attribute (can be called from layout) ---
/**
 * Applies the correct data-theme attribute to the document element based on the store value.
 * Handles the 'system' theme case by removing the attribute.
 * @param {Theme} currentThemeValue - The value from the themeStore ('light', 'dark', or 'system').
 */
export function applyTheme(currentThemeValue) {
    if (!browser) return;

    const root = document.documentElement;

    if (currentThemeValue === 'system') {
        // If system, let the CSS media query handle it by *removing* the attribute
        root.removeAttribute('data-theme');
        // console.log('Applying theme: system (attribute removed)');
    } else {
        // If light or dark, set the attribute explicitly
        root.setAttribute('data-theme', currentThemeValue);
        // console.log(`Applying theme attribute: data-theme="${currentThemeValue}"`);
    }
}

// --- Initialize theme attribute on first client-side load ---
// This ensures the attribute matches the initial store state
if (browser) {
    applyTheme(initialTheme);
}