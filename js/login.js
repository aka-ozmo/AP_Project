import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { initializeFirestore, doc, setDoc, getDoc, onSnapshot, collection, persistentLocalCache } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // Global Variables
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
        const db = initializeFirestore(app, { localCache: persistentLocalCache() });

        // UI References
        const authContainer = document.getElementById('auth-container');
        const authForm = document.getElementById('auth-form');
        const authPasswordEyeToggle = document.getElementById('password-visiblity-toggle');
        const authSubmitBtn = document.getElementById('auth-submit-btn');
        const authError = document.getElementById('auth-error');
        const authMessage = document.getElementById('auth-message');

        let isLoggingIn = false;


authPasswordEyeToggle.onclick = () => {
    const passwordInput = document.getElementById('auth-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        authPasswordEyeToggle.innerHTML = '<i data-lucide="eye-off"></i>';
    } else {
        passwordInput.type = 'password';
        authPasswordEyeToggle.innerHTML = '<i data-lucide="eye"></i>';
    }
    lucide.createIcons();
};
        // Handle Auth Submission
        authForm.onsubmit = async (e) => {
            e.preventDefault();
            authError.classList.add('hidden');
            authMessage.classList.add('hidden');
            authSubmitBtn.classList.add('is-loading');
            isLoggingIn = true;

            const contact = document.getElementById('auth-contact').value;
            const password = document.getElementById('auth-password').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, contact, password);
                const uid = userCredential.user.uid;

                const snap = await getDoc(doc(db, 'artifacts', 'users', uid, 'profile'));
                if (!snap.exists()) {
                    console.warn("User profile missing in Firestore");
                } else {
                    localStorage.setItem('webflix_username', snap.data().username);
                }
                // Manual redirect after cache is set
                window.location.href = 'homePage.html';
            } catch (err) {
                isLoggingIn = false;
                authError.textContent = err.message;
                authError.classList.remove('hidden');
            } finally {
                authSubmitBtn.classList.remove('is-loading');
            }
        };

        // Auth State Listener
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Redirect to homepage only if not currently processing a login
                if (!isLoggingIn) {
                    window.location.href = 'homePage.html';
                }
            } else {
                authContainer.style.display = 'flex';
            }
        });

        lucide.createIcons();