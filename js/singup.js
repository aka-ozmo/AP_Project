import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        const appId = typeof __app_id !== '1:625011942136:web:9af0d12c8b7fe3886c910d' ? __app_id : 'movie-app-demo';
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
        const db = getFirestore(app);

        document.getElementById('signup-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = document.getElementById('signup-btn');
            const errorEl = document.getElementById('signup-error');
            
            const username = document.getElementById('signup-username').value;
            const contact = document.getElementById('signup-contact').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            // Clear previous errors
            errorEl.classList.add('hidden');

            // 1. Password Match Validation
            if (password !== confirmPassword) {
                errorEl.textContent = "Error: Passwords do not match.";
                errorEl.classList.remove('hidden');
                return;
            }

            btn.classList.add('is-loading');

            try {
                // Sign in the user
                await signInAnonymously(auth);
                const uid = auth.currentUser.uid;
                
                // Save their profile
                await setDoc(doc(db, 'artifacts', appId, 'users', uid, 'profile'), {
                    username, 
                    contact, 
                    createdAt: new Date().toISOString()
                });

                // Redirect to the main app page
                window.location.href = 'index.html';
                
            } catch (err) {
                errorEl.textContent = "Error: " + err.message;
                errorEl.classList.remove('hidden');
            } finally {
                btn.classList.remove('is-loading');
            }
        };

        lucide.createIcons();