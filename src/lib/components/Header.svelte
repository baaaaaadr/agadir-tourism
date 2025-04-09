<script>
    import { goto } from '$app/navigation'; // Import navigation function
    import { Menu, Search, X } from 'lucide-svelte'; // Add X icon
    import { isSideNavOpen } from '$lib/stores/navStore';
    import { fly } from 'svelte/transition'; // Import transition

    let showSearchInput = false; // State to control input visibility
    let searchQuery = ''; // State to bind to the input value

    function toggleNav() {
        isSideNavOpen.update(value => !value);
    }

    function toggleSearchInput() {
        showSearchInput = !showSearchInput;
        if (!showSearchInput) {
            searchQuery = ''; // Clear query when closing
        }
        // Optional: focus input when shown (needs tick or timeout)
        // if (showSearchInput) {
        //     setTimeout(() => document.getElementById('searchInput')?.focus(), 50);
        // }
    }

    function handleSearchSubmit() {
        if (searchQuery.trim()) {
            console.log('Navigating to search with query:', searchQuery);
            // Navigate to the search page with the query parameter
            goto(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            // Optionally close the input after searching
            showSearchInput = false;
            searchQuery = '';
        } else {
            console.log('Search query is empty, not navigating.');
            // Maybe show a small message or just close the input
             showSearchInput = false; // Close if empty submit
        }
    }

    // Allow submitting search by pressing Enter in the input
    function handleKeydown(event) {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
         if (event.key === 'Escape') {
             toggleSearchInput(); // Close on Escape key
         }
    }

</script>

<header class:search-active={showSearchInput}>
    <div class="header-content">
        <!-- Menu Button -->
        {#if !showSearchInput}
            <button class="menu-button" on:click={toggleNav} aria-label="Ouvrir le menu">
                <Menu size={24} />
            </button>
        {/if}

        <!-- Logo (conditionally hidden during search on small screens) -->
         <div class="logo" class:hidden-on-search={showSearchInput}>
             <a href="/" class="logo-link">
              <h1>Agadir Tourism</h1>
            </a>
          </div>

        <!-- Search Input Area (conditionally shown) -->
        {#if showSearchInput}
            <div class="search-input-container" transition:fly={{ x: 100, duration: 200 }}>
                <input
                    type="search"
                    id="searchInput"
                    placeholder="Rechercher un lieu, restaurant..."
                    bind:value={searchQuery}
                    on:keydown={handleKeydown}
                    autofocus
                />
                 <!-- Submit button within input area -->
                <button class="submit-search-button" on:click={handleSearchSubmit} aria-label="Lancer la recherche">
                     <Search size={20} />
                </button>
                 <!-- Close button within input area -->
                 <button class="close-search-button" on:click={toggleSearchInput} aria-label="Fermer la recherche">
                     <X size={20} />
                 </button>
            </div>
        {/if}


        <!-- Original Search Toggle Button (always visible unless input is shown) -->
        {#if !showSearchInput}
             <button class="search-button" on:click={toggleSearchInput} aria-label="Ouvrir la recherche">
                <Search size={24} />
             </button>
        {/if}
    </div>
</header>

<style>
    header {
        background-color: var(--ocean-blue);
        color: white;
        position: sticky;
        top: 0;
        z-index: 100;
        box-shadow: var(--shadow-md);
        padding: 0 var(--space-md);
        transition: background-color 0.3s ease; /* Smooth transition */
    }

    /* Slightly different background when search is active */
     header.search-active {
        /* background-color: var(--ocean-blue-dark); */
     }


    .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        max-width: 1200px;
        margin: 0 auto;
    }

    /* --- Logo --- */
    .logo {
        flex-grow: 1; /* Takes up space */
        text-align: center;
        /* Transition for smooth hide/show */
         transition: opacity 0.2s ease, transform 0.2s ease;
         opacity: 1;
         transform: scale(1);
    }
    .logo-link { color: white; text-decoration: none; display: inline-block; }
    .logo-link h1 { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; margin: 0; line-height: 1; }

    /* --- Search Input Area --- */
    .search-input-container {
        display: flex;
        align-items: center;
        background-color: white;
        border-radius: var(--radius-md);
        padding: var(--space-xs) var(--space-sm);
        flex-grow: 1; /* Take available space */
        margin: 0 var(--space-sm); /* Spacing around input */
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    }

    .search-input-container input[type="search"] {
        border: none;
        outline: none;
        flex-grow: 1;
        font-size: 0.95rem;
        padding: var(--space-xs) 0; /* Minimal vertical padding */
        background: transparent;
        color: var(--text-primary);
    }
     /* Clear default cancel button */
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
      -webkit-appearance:none;
    }

    .submit-search-button, .close-search-button {
         background: transparent;
         border: none;
         color: var(--ocean-blue); /* Icon color */
         cursor: pointer;
         padding: var(--space-xs);
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: var(--radius-sm);
         transition: background-color var(--transition-fast);
    }
     .close-search-button {
         color: var(--text-secondary); /* Slightly muted close button */
     }

     .submit-search-button:hover {
         background-color: var(--ocean-blue-light);
         color: white;
     }
      .close-search-button:hover {
         background-color: var(--sandy-beige-light);
         color: var(--text-primary);
     }


    /* --- Buttons --- */
    .menu-button,
    .search-button {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: var(--space-sm);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color var(--transition-normal);
        flex-shrink: 0; /* Prevent buttons from shrinking */
    }

    .menu-button:hover,
    .search-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

     /* --- Responsive Adjustments --- */
     @media (max-width: 600px) {
        .logo-link h1 {
            font-size: 1.25rem;
         }
         .header-content {
            height: 56px;
         }
         /* Hide logo when search is active on small screens */
         .logo.hidden-on-search {
             opacity: 0;
             transform: scale(0.8);
             /* flex-grow: 0; */ /* Remove its space - might cause jump */
             width: 0; /* Try hiding width */
             overflow: hidden;
             pointer-events: none; /* Prevent interaction */
             margin: 0; padding: 0;
         }
        .search-input-container {
             margin-left: 0; /* Take full space when logo hidden */
        }
    }

</style>