

// Initialize Lucide icons (guarded in case lucide is not defined at import time)
if (typeof lucide !== 'undefined' && lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
}

// --- Mock Movie Data ---
const mockMovies = [
    { id: 1, title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi / Action", posterText: "INCEPTION" },
    { id: 2, title: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi / Action", posterText: "MATRIX" },
    { id: 3, title: "Interstellar", year: 2014, rating: 8.6, genre: "Sci-Fi / Drama", posterText: "INTERSTELLAR" },
    { id: 4, title: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Crime / Drama", posterText: "PULP FICTION" },
    { id: 5, title: "Fight Club", year: 1999, rating: 8.8, genre: "Drama / Thriller", posterText: "FIGHT CLUB" },
    { id: 6, title: "Parasite", year: 2019, rating: 8.5, genre: "Comedy / Thriller", posterText: "PARASITE" },
    { id: 7, title: "Joker", year: 2019, rating: 8.4, genre: "Crime / Drama", posterText: "JOKER" },
    { id: 8, title: "Dune", year: 2021, rating: 8.0, genre: "Sci-Fi / Adventure", posterText: "DUNE" },
    { id: 9, title: "Mad Max: Fury Road", year: 2015, rating: 8.1, genre: "Action / Sci-Fi", posterText: "MAD MAX" },
    { id: 10, title: "Arrival", year: 2016, rating: 7.9, genre: "Sci-Fi / Mystery", posterText: "ARRIVAL" },
    { id: 11, title: "Blade Runner 2049", year: 2017, rating: 8.0, genre: "Sci-Fi / Neo-Noir", posterText: "BR 2049" },
    { id: 12, title: "Whiplash", year: 2014, rating: 8.5, genre: "Drama / Music", posterText: "WHIPLASH" },
    { id: 13, title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action / Crime", posterText: "TDK" },
    { id: 14, title: "Spirited Away", year: 2001, rating: 8.6, genre: "Animation / Fantasy", posterText: "SPIRITED AWAY" },
    { id: 15, title: "No Country for Old Men", year: 2007, rating: 8.1, genre: "Thriller / Western", posterText: "NO COUNTRY" },
    { id: 16, title: "Get Out", year: 2017, rating: 7.7, genre: "Horror / Mystery", posterText: "GET OUT" },
    { id: 17, title: "Eternal Sunshine", year: 2004, rating: 8.3, genre: "Sci-Fi / Romance", posterText: "ETERNAL" },
    { id: 18, title: "Reservoir Dogs", year: 1992, rating: 8.3, genre: "Crime / Thriller", posterText: "RESERVOIR" },
    { id: 19, title: "Donnie Darko", year: 2001, rating: 8.0, genre: "Sci-Fi / Drama", posterText: "DONNIE DARKO" },
    { id: 20, title: "Amelie", year: 2001, rating: 8.3, genre: "Comedy / Romance", posterText: "AMELIE" },
];

// Function to create a placeholder image URL
function getPosterUrl(title) {
    const text = title.toUpperCase().replace(/\s+/g, '+');
    const colorCode = '1f2937'; // Gray 800 background
    const textColor = 'ffffff'; // White text
    return `https://placehold.co/210x315/${colorCode}/${textColor}?text=${text}`;
}

// Function to render a single movie card
function createMovieCard(movie) {
    const posterUrl = getPosterUrl(movie.posterText);

    // Create the main card container (link)
    const cardLink = document.createElement('a');
    cardLink.href = `#movie-${movie.id}`; // Mock link
    cardLink.className = 'movie-card-container';
    cardLink.style.aspectRatio = '2 / 3';

    // Movie Poster Image
    const posterImg = document.createElement('img');
    posterImg.src = posterUrl;
    posterImg.alt = `Poster for ${movie.title}`;
    posterImg.className = 'movie-poster';
    posterImg.onerror = function() {
        this.onerror = null;
        this.src = getPosterUrl('Error');
    };

    // Card Overlay (appears on hover)
    const overlayDiv = document.createElement('div');
    overlayDiv.className = 'card-overlay';

    // Rating
    const ratingP = document.createElement('p');
    ratingP.className = 'title is-3 has-text-warning mb-3';
    ratingP.innerHTML = `${movie.rating} <span class="is-size-6 has-text-weight-normal has-text-grey-light">/ 10</span>`;

    // Genre
    const genreP = document.createElement('p');
    genreP.className = 'subtitle is-6 has-text-grey-light mb-1';
    genreP.textContent = movie.genre;

    // Year
    const yearP = document.createElement('p');
    yearP.className = 'subtitle is-7 has-text-grey-light mb-4';
    yearP.textContent = `Year: ${movie.year}`;

    // Download Button (Bulma Button)
    const downloadButton = document.createElement('button');
    downloadButton.className = 'download-button button is-rounded is-small has-text-weight-bold';
    downloadButton.innerHTML = `<span class="icon"><i data-lucide="download" class="w-4 h-4"></i></span><span>Download</span>`;
    downloadButton.onclick = (e) => {
        e.preventDefault();
        console.log(`Downloading ${movie.title}... (Mock Action)`);
    };

    // Title below the card (always visible)
    const titleDiv = document.createElement('div');
    titleDiv.className = 'absolute bottom-0 left-0 right-0 custom-card-footer-bg';
    titleDiv.innerHTML = `<p class="has-text-white has-text-weight-semibold is-size-7 pt-1 pb-1 pl-2 pr-2 is-clipped">${movie.title}</p>`;

    // Append elements
    overlayDiv.append(ratingP, genreP, yearP, downloadButton);

    cardLink.append(posterImg, overlayDiv);

    // Create Bulma column wrapper for responsiveness
    const wrapper = document.createElement('div');
    // is-half-mobile = 2 cards per row on mobile
    // is-one-third-tablet = 3 cards per row on tablet
    // is-one-quarter-desktop = 4 cards per row on desktop
    // is-one-fifth-widescreen = 5 cards per row on widescreen
    wrapper.className = 'column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-relative';
    wrapper.append(cardLink, titleDiv);

    // Re-initialize Lucide icons within the new element if available
    if (typeof lucide !== 'undefined' && lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons({ attr: 'data-lucide', element: downloadButton });
    }

    return wrapper;
}

// Function to render all movies
function renderMovies(moviesArray) {
    const grid = document.getElementById('movie-grid');
    if (!grid) return;

    grid.innerHTML = ''; // Clear existing content

    moviesArray.forEach(movie => {
        const card = createMovieCard(movie);
        grid.appendChild(card);
    });
}

// Simple search functionality
function handleSearch() {
    const searchTermEl = document.getElementById('movie-search');
    const searchTerm = searchTermEl ? searchTermEl.value.toLowerCase() : '';
    const filteredMovies = mockMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.genre.toLowerCase().includes(searchTerm) ||
        movie.year.toString().includes(searchTerm)
    );
    renderMovies(filteredMovies);
}

// Event listener for search input
const searchInput = document.getElementById('movie-search');
if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
}

// Initial render when the page loads
window.addEventListener('DOMContentLoaded', () => {
    renderMovies(mockMovies);
});