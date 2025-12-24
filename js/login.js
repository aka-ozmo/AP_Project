import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // Global Variables
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'movie-app-demo';
        const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // UI References
        const authContainer = document.getElementById('auth-container');
        const appContent = document.getElementById('app-content');
        const authForm = document.getElementById('auth-form');
        const authToggle = document.getElementById('auth-toggle-btn');
        const authSubmitBtn = document.getElementById('auth-submit-btn');
        const authError = document.getElementById('auth-error');
        const authMessage = document.getElementById('auth-message');
        const displayUsername = document.getElementById('display-username');
        const movieGrid = document.getElementById('movie-grid');

        let isSignUp = false;
        let currentUser = null;
        let userPosters = {};

        // Forgot Password Mock Function
        window.handleForgotPassword = (e) => {
            e.preventDefault();
            const contact = document.getElementById('auth-contact').value;
            authError.classList.add('hidden');
            authMessage.classList.add('hidden');

            if (!contact) {
                authError.textContent = "Please enter your Email or Phone first.";
                authError.classList.remove('hidden');
                return;
            }

            authMessage.textContent = `A reset link has been sent to ${contact}.`;
            authMessage.classList.remove('hidden');
        };

        // Toggle Sign In / Sign Up
        authToggle.onclick = () => {
            isSignUp = !isSignUp;
            authSubmitBtn.textContent = isSignUp ? 'Create Account' : 'Sign In';
            document.getElementById('auth-subtitle').textContent = isSignUp ? 'Join the community' : 'Sign in to access your library';
            document.getElementById('toggle-text').textContent = isSignUp ? 'Already have an account?' : "Don't have an account?";
            authToggle.textContent = isSignUp ? 'Sign In' : 'Sign Up';

            // Hide/Show forgot password
            document.getElementById('forgot-password-container').classList.toggle('hidden', isSignUp);
            authError.classList.add('hidden');
            authMessage.classList.add('hidden');
        };

        // Handle Auth Submission
        authForm.onsubmit = async (e) => {
            e.preventDefault();
            authError.classList.add('hidden');
            authMessage.classList.add('hidden');
            authSubmitBtn.classList.add('is-loading');

            const contact = document.getElementById('auth-contact').value;
            const password = document.getElementById('auth-password').value;
            const username = document.getElementById('auth-username').value;

            try {
                await signInAnonymously(auth);
                const uid = auth.currentUser.uid;

                if (isSignUp) {
                    await setDoc(doc(db, 'artifacts', appId, 'users', uid, 'profile'), {
                        username, contact, createdAt: new Date().toISOString()
                    });
                } else {
                    const snap = await getDoc(doc(db, 'artifacts', appId, 'users', uid, 'profile'));
                    if (!snap.exists()) {
                        throw new Error("User not found. Try signing up first.");
                    }
                }
            } catch (err) {
                authError.textContent = err.message;
                authError.classList.remove('hidden');
            } finally {
                authSubmitBtn.classList.remove('is-loading');
            }
        };

        // Auth State Listener
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                currentUser = user;
                authContainer.style.display = 'none';
                appContent.style.display = 'block';

                const profileSnap = await getDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'profile'));
                displayUsername.textContent = profileSnap.exists() ? profileSnap.data().username : 'User';

                const postersPath = collection(db, 'artifacts', appId, 'users', user.uid, 'posters');
                onSnapshot(postersPath, (snap) => {
                    userPosters = {};
                    snap.forEach(d => userPosters[d.id] = d.data().image);
                    renderMovies();
                }, (err) => console.error("Firestore error:", err));
            } else {
                authContainer.style.display = 'flex';
                appContent.style.display = 'none';
            }
        });

        // Logout
        document.getElementById('logout-btn').onclick = () => signOut(auth);

        // --- Movie Data & Rendering ---
        const movies = [
            { id: 1, title: "Inception", year: 2010, rating: 8.8 },
            { id: 2, title: "Interstellar", year: 2014, rating: 8.6 },
            { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0 },
            { id: 4, title: "The Matrix", year: 1999, rating: 8.7 },
            { id: 5, title: "Pulp Fiction", year: 1994, rating: 8.9 },
            { id: 6, title: "Fight Club", year: 1999, rating: 8.8 }
        ];

        function renderMovies() {
            movieGrid.innerHTML = '';
            movies.forEach(movie => {
                const poster = userPosters[movie.id] || `https://placehold.co/300x450/1e293b/f1f5f9?text=${movie.title}`;
                const col = document.createElement('div');
                col.className = 'column is-one-third-tablet is-one-quarter-desktop is-half-mobile';
                col.innerHTML = `
                    <div class="movie-card-container">
                        <img src="${poster}" class="movie-poster">
                        <div class="card-overlay">
                            <h3 class="title is-4 has-text-warning">${movie.rating}</h3>
                            <button class="button is-indigo is-small" onclick="window.openUpload(${movie.id})">Change Poster</button>
                        </div>
                    </div>
                    <p class="has-text-weight-bold is-size-7 mt-2 mb-0">${movie.title}</p>
                    <p class="is-size-7 has-text-grey-light">${movie.year}</p>
                `;
                movieGrid.appendChild(col);
            });
            lucide.createIcons();
        }

        // --- Upload Logic ---
        let targetMovieId = null;
        window.openUpload = (id) => {
            targetMovieId = id;
            document.getElementById('upload-modal').classList.add('is-active');
        };

        window.closeModal = () => {
            document.getElementById('upload-modal').classList.remove('is-active');
            document.getElementById('file-input').value = '';
            document.getElementById('upload-preview').src = '';
        };

        document.getElementById('file-input').onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => document.getElementById('upload-preview').src = ev.target.result;
                reader.readAsDataURL(file);
            }
        };

        document.getElementById('confirm-upload').onclick = async () => {
            const base64 = document.getElementById('upload-preview').src;
            if (!base64 || !currentUser) return;

            const btn = document.getElementById('confirm-upload');
            btn.classList.add('is-loading');

            try {
                await setDoc(doc(db, 'artifacts', appId, 'users', currentUser.uid, 'posters', String(targetMovieId)), {
                    image: base64
                });
                window.closeModal();
            } catch (err) {
                console.error(err);
            } finally {
                btn.classList.remove('is-loading');
            }
        };

        // Get a reference to the Realtime Database service
const database = firebase.database();

// Write data
function writeUserData(userId, name, email, imageUrl) {
  database.ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

// Read data (listen for changes)
const starCountRef = database.ref('posts/123/starCount');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log("Star count: " + data);
});


        lucide.createIcons();