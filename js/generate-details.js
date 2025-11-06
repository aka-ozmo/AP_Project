/* Utilities to generate a details page from a template using sessionStorage.
	 - renderDemo(containerId, movies): renders a clickable gallery of movie cards
	 - generateDetails(movie): stores movie in sessionStorage and navigates to template with key
*/

function generateKey(movie) {
	return 'movie_' + (movie.id || movie.title || Date.now()) + '_' + Math.random().toString(36).slice(2, 8);
}

function generateDetails(movie) {
	const key = generateKey(movie);
	try {
		sessionStorage.setItem(key, JSON.stringify(movie));
	} catch (e) {
		console.error('Failed to store movie in sessionStorage', e);
		// fallback: open template without data
	}
	// Navigate to template with the key in query string
	const url = new URL(window.location.href);
	// If current script is loaded from html page, compute relative path
	const base = window.location.pathname.replace(/[^/]*$/, '');
	window.location.href = base + 'details-templete.html?key=' + encodeURIComponent(key);
}

function renderDemo(containerId, movies) {
	const root = document.getElementById(containerId);
	if (!root) return;
	root.innerHTML = '';
	movies.forEach((m) => {
		const col = document.createElement('div');
		col.className = 'column is-one-quarter-desktop is-one-third-tablet is-half-mobile';

		const card = document.createElement('div');
		card.className = 'card';

		const cardImg = document.createElement('div');
		cardImg.className = 'card-image';

		const figure = document.createElement('figure');
		figure.className = 'image is-2by3';
		const img = document.createElement('img');
		img.className = 'poster-image';
		img.alt = m.title || 'poster';
		img.src = m.poster || '../assets/images/images-w1400.jpg';
		figure.appendChild(img);
		cardImg.appendChild(figure);

		const cardContent = document.createElement('div');
		cardContent.className = 'card-content';
		const media = document.createElement('div');
		media.className = 'media';
		const mediaContent = document.createElement('div');
		mediaContent.className = 'media-content';
		const pTitle = document.createElement('p');
		pTitle.className = 'title is-6';
		pTitle.textContent = m.title || '';
		const pSub = document.createElement('p');
		pSub.className = 'subtitle is-7 has-text-grey';
		pSub.textContent = (m.year || '') + (m.duration ? ' • ' + m.duration + ' min' : '');
		mediaContent.appendChild(pTitle);
		mediaContent.appendChild(pSub);
		media.appendChild(mediaContent);
		cardContent.appendChild(media);

		card.appendChild(cardImg);
		card.appendChild(cardContent);

		// click handler
		card.addEventListener('click', () => generateDetails(m));

		col.appendChild(card);
		root.appendChild(col);
	});
}

// Expose functions for debugging or other pages
window.generateDetails = generateDetails;
window.renderDemo = renderDemo;
