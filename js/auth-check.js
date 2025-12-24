import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { initializeFirestore, doc, getDoc, persistentLocalCache } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA98YDCtozjqg-rrcGjQObXd5NEVoF3hLc",
    authDomain: "webflix-ap1-project.firebaseapp.com",
    projectId: "webflix-ap1-project",
    storageBucket: "webflix-ap1-project.appspot.com",
    messagingSenderId: "625011942136",
    appId: "1:625011942136:web:9af0d12c8b7fe3886c910d",
    measurementId: "G-PBFXXTSYMF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore with persistent cache
const db = initializeFirestore(app, { localCache: persistentLocalCache() });


onAuthStateChanged(auth, async (user) => {
    const navbarEnd = document.querySelector('.navbar-end');
    if (!navbarEnd) return;

    // Find existing elements
    const loginBtn = navbarEnd.querySelector('a[href*="login.html"]');
    const existingUserDisplay = document.getElementById('nav-user-display');

    if (user) {

        // If logged in: Remove login button, show user info
        if (existingUserDisplay) return;

        // 1. Try to get username from Local Storage first (Instant UI, persists across restarts)
        const cachedName = localStorage.getItem('webflix_username');
        const displayName = cachedName || 'User';

        const fragment = document.createDocumentFragment();

        // User Display
        const userDiv = document.createElement('div');
        userDiv.id = 'nav-user-display';
        userDiv.className = 'navbar-item has-text-grey-light';
        userDiv.textContent = `Hi, ${displayName}`;

        // Logout Button
        const logoutBtn = document.createElement('a');
        logoutBtn.id = 'nav-logout-btn';
        logoutBtn.className = 'navbar-item has-text-danger-light';
        logoutBtn.textContent = 'Logout';
        logoutBtn.href = "#";
        logoutBtn.onclick = async (e) => {
            e.preventDefault();
            localStorage.removeItem('webflix_username'); // Clear cache
            await signOut(auth);
            window.location.reload(); // Refresh to reset UI
        };

        fragment.appendChild(userDiv);
        fragment.appendChild(logoutBtn);

        if (loginBtn) loginBtn.remove();
        navbarEnd.appendChild(fragment);

        // 2. Fetch fresh username from Firestore in background
        try {
            const snap = await getDoc(doc(db, 'artifacts', 'users', user.uid, 'profile'));
            if (snap.exists()) {
                const freshName = snap.data().username;
                if (freshName && freshName !== cachedName) {
                    userDiv.textContent = `Hi, ${freshName}`;
                    localStorage.setItem('webflix_username', freshName);
                }
            }
        } catch (e) {
            // Silently ignore offline errors to prevent console noise
        }

    } else {
        // If logged out: Ensure Login button is visible
        if (existingUserDisplay) existingUserDisplay.remove();
        const logoutBtn = document.getElementById('nav-logout-btn');
        if (logoutBtn) logoutBtn.remove();

        // Clear cache
        localStorage.removeItem('webflix_username');

        if (!navbarEnd.querySelector('a[href*="login.html"]')) {
            const loginLink = document.createElement('a');
            loginLink.href = 'login.html';
            loginLink.className = 'navbar-item has-text-grey-light';
            loginLink.textContent = 'Log In';
            navbarEnd.appendChild(loginLink);
        }
    }
});