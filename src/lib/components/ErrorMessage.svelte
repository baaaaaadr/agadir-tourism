<script>
    export let message = "Une erreur s'est produite.";
</script>

<div class="error-message">
    <p>😕 Oops !</p>
    <p>{message}</p>
</div>

<style>
    .error-message {
        border: 1px solid #dc3545;
        color: #721c24;
        background-color: #f8d7da;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem 0;
        text-align: center;
    }
    .error-message p:first-child {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
</style>