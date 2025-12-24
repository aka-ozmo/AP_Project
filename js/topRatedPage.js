/**
 * This script handles the logic for the top-rated movies page.
 * It filters the dataset for movies with a rating of 8.5 or higher,
 * sorts them in descending order, and renders them into the gallery container.
 */
import { movies } from './data.js';

// Filter movies with a rating greater than or equal to 8.5
const topRatedMovies = movies.filter(movie => parseFloat(movie.rating) >= 8.5);

// Sort the filtered movies by rating in descending order (highest first)
topRatedMovies.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

// Render the gallery using the helper from generate-details.js
// This will run once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    if (window.renderMovies) {
        renderMovies('gallery', topRatedMovies);
    }
});