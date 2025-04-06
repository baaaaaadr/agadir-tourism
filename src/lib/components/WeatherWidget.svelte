<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte'; // Réutilise le spinner
    import ErrorMessage from '$lib/components/ErrorMessage.svelte'; // Réutilise le message d'erreur

    // --- Configuration ---
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const lat = 30.4202; // Latitude d'Agadir
    const lon = -9.5982; // Longitude d'Agadir
    const units = 'metric'; // Pour avoir les températures en Celsius
    const lang = 'fr'; // Pour avoir les descriptions en français

    // --- State ---
    let weatherData = null;
    let loading = true;
    let error = null;

    // --- Fetch Data ---
    async function fetchWeatherData() {
        loading = true;
        error = null;

        if (!apiKey) {
            error = "Clé API OpenWeatherMap manquante dans les variables d'environnement (.env).";
            loading = false;
            console.error(error);
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                // Gère les erreurs HTTP (ex: 401 Unauthorized si clé API invalide, 404 Not Found...)
                const errorData = await response.json().catch(() => ({ message: response.statusText })); // Essaie de lire le message d'erreur JSON
                throw new Error(`Erreur ${response.status}: ${errorData.message || response.statusText}`);
            }

            weatherData = await response.json();
            console.log("Données météo reçues:", weatherData); // Pour le débogage

        } catch (err) {
            console.error("Erreur lors de la récupération de la météo:", err);
            error = `Impossible de charger la météo : ${err.message}`;
            weatherData = null; // S'assure qu'aucune donnée partielle n'est affichée
        } finally {
            loading = false;
        }
    }

    // --- Lifecycle ---
    onMount(() => {
        // Ne fetch que côté client
        if (browser) {
            fetchWeatherData();
            // Optionnel: Mettre à jour la météo toutes les X minutes
            // setInterval(fetchWeatherData, 30 * 60 * 1000); // 30 minutes
        } else {
            // Pendant le SSR, on ne charge pas la météo
            loading = false;
            error = "La météo se charge côté client."; // Message informatif
        }
    });

    // --- Helpers ---
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Génère l'URL de l'icône météo OpenWeatherMap
    $: iconUrl = weatherData?.weather?.[0]?.icon
        ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        : null;

</script>

<div class="weather-widget">
    <h3>Météo à Agadir</h3>

    {#if loading}
        <LoadingSpinner />
    {:else if error}
        <ErrorMessage message={error} />
    {:else if weatherData}
        <div class="weather-content">
            {#if iconUrl}
                <img src={iconUrl} alt={weatherData.weather[0].description || 'Icône météo'} class="weather-icon">
            {/if}
            <div class="weather-details">
                <span class="temperature">{Math.round(weatherData.main.temp)}°C</span>
                <span class="description">{capitalizeFirstLetter(weatherData.weather[0].description)}</span>
                {#if weatherData.main.feels_like}
                     <span class="feels-like">Ressenti: {Math.round(weatherData.main.feels_like)}°C</span>
                {/if}
            </div>
        </div>
        <p class="data-source">
            Données: <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>
        </p>
    {:else}
         <p>Impossible d'afficher la météo pour le moment.</p>
    {/if}
</div>

<style>
    .weather-widget {
        background-color: #e7f3fe; /* Bleu très clair */
        border: 1px solid #bce0fd;
        border-radius: 8px;
        padding: 1rem 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }

    h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: #005fa3; /* Bleu un peu plus foncé */
        text-align: center;
        font-size: 1.1rem;
    }

    .weather-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        min-height: 60px; /* Pour éviter les sauts pendant le chargement */
    }

    .weather-icon {
        width: 50px;
        height: 50px;
        object-fit: contain;
        margin: 0;
    }

    .weather-details {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Aligne à gauche dans la colonne */
    }

    .temperature {
        font-size: 1.8rem;
        font-weight: bold;
        color: #333;
        line-height: 1;
    }

    .description {
        font-size: 1rem;
        color: #555;
        margin-top: 0.2rem;
    }
    .feels-like {
        font-size: 0.85rem;
        color: #777;
        margin-top: 0.2rem;
    }

    /* Centre le spinner et l'erreur s'ils s'affichent */
    .weather-widget :global(.spinner-container),
    .weather-widget :global(.error-message) {
        padding: 0.5rem; /* Moins de padding que la version standard */
        margin: 0 auto; /* Centre horizontalement */
        border: none;
        background: none;
    }
     .weather-widget :global(.error-message) {
        text-align: left; /* Garde le texte de l'erreur aligné à gauche */
         max-width: 90%;
         font-size: 0.9rem;
     }

    .data-source {
        text-align: center;
        font-size: 0.75rem;
        color: #888;
        margin-top: 0.8rem;
        margin-bottom: 0;
    }
    .data-source a {
        color: #666;
    }
</style>