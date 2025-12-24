/**
 * This script handles search functionality across the application.
 * It listens for search input to redirect users to the results page,
 * and filters the movie dataset based on URL query parameters to display
 * matching results.
 */
import { movies } from "./data.js";

const search = document.getElementById("movie-search");

if (search) {
  // Listen for the 'Enter' key in the search bar to trigger the search redirection
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const searchString = e.target.value;
      window.location.href = `searchResultpage.html?query=${encodeURIComponent(searchString)}`;
    }
  });
}

// On page load, check for a search query in the URL parameters
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (query) {
    // Filter the movies array based on title, cast, or genre (case-insensitive)
    const searchString = query.toLowerCase();
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchString) ||
      movie.cast.some((actor) => actor.toLowerCase().includes(searchString)) ||
      movie.genres.some((genre) => genre.toLowerCase().includes(searchString))
    );
    if (window.renderMovies) {
      renderMovies("gallery", filteredMovies);
    }
  }
});