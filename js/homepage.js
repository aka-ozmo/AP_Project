/**
 * This script handles the logic for the home page.
 * It import the dataset for movies, downloads list
 * and renders them into the gallery container.
 */

import { movies } from './data.js';

// Render demo gallery using helper from generate-details.js
// This will run once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    if (window.renderDemo) {
        renderDemo('gallery', movies);
    }
});