<div class="spinner-container">
    <div class="spinner"></div>
    <p>Chargement...</p>
</div>

<style>
    .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        color: #555;
    }
    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: var(--ocean-blue, #0077cc); 
        animation: spin 1s ease infinite;
        margin-bottom: 0.5rem;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>