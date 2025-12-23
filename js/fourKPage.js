/**
 * This script handles the logic for the 4K movies page.
 * It filters the dataset for movies that include a '2160p' option in their
 * downloads list and renders them into the gallery container.
 */
import { movies } from './data.js';

// Filter movies that have a download option labeled '2160p'
const fourKMovies = movies.filter(movie =>
    movie.downloads && movie.downloads.some(option => option.label === '2160p')
);

// Render the gallery using the helper from generate-details.js
// This will run once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    if (window.renderDemo) {
        renderDemo('gallery', fourKMovies);
    }
});