/**
 * This script handles the logic for the trending movies page.
 * It filters the dataset for movies released in or after 2022 and renders
 * them into the gallery container using the shared utility functions.
 */
import { movies } from './data.js';

const trendingMovies = [];

movies.forEach(element => {
    // Filter for movies released in 2022 or later to define "trending"
    if (element.year >= 2022) {
        trendingMovies.push(element);
    }
});
// Render demo gallery using helper from generate-details.js
// This will run once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    if (window.renderDemo) {
        renderDemo('gallery', trendingMovies);
    }
});