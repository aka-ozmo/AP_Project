import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

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

document.getElementById('forgot-form').onsubmit = async (e) => {
    e.preventDefault();
    const contact = document.getElementById('forgot-contact').value.trim();
    const btn = document.getElementById('forgot-btn');
    const successEl = document.getElementById('forgot-success');
    const errorEl = document.getElementById('forgot-error');

    btn.classList.add('is-loading');
    successEl.classList.add('hidden');
    errorEl.classList.add('hidden');

    try {
        await sendPasswordResetEmail(auth, contact);
        successEl.textContent = `A reset link has been sent to ${contact}. Please check your inbox.`;
        successEl.classList.remove('hidden');
        document.getElementById('forgot-form').reset();
    } catch (error) {
        errorEl.textContent = error.message;
        errorEl.classList.remove('hidden');
    } finally {
        btn.classList.remove('is-loading');
    }
};


lucide.createIcons();