// Logic to simulate password reset

/*
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
        const db = getFirestore(app);*/


        document.getElementById('forgot-form').onsubmit = (e) => {
            e.preventDefault();
            const contact = document.getElementById('forgot-contact').value;
            const btn = document.getElementById('forgot-btn');
            const successEl = document.getElementById('forgot-success');
            const errorEl = document.getElementById('forgot-error');

            btn.classList.add('is-loading');
            successEl.classList.add('hidden');
            errorEl.classList.add('hidden');

            // Simulate API call delay
            setTimeout(() => {
                btn.classList.remove('is-loading');
                if (contact.includes('@') || contact.length > 5) {
                    successEl.textContent = `Success! A reset link has been sent to ${contact}. Please check your inbox.`;
                    successEl.classList.remove('hidden');
                    document.getElementById('forgot-form').reset();
                } else {
                    errorEl.textContent = "Please enter a valid email or phone number.";
                    errorEl.classList.remove('hidden');
                }
            }, 1000);
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