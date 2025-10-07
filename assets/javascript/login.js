
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbtRP0GfZuD0bCkSKCzV9rkmtTR6dtho0",
    authDomain: "fir-prac-90c3d.firebaseapp.com",
    projectId: "fir-prac-90c3d",
    storageBucket: "fir-prac-90c3d.firebasestorage.app",
    messagingSenderId: "347731607771",
    appId: "1:347731607771:web:a47bc7c4ecdc5dd8f60cfe",
    measurementId: "G-EERV4PF94T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = document.getElementById("email");
const pass = document.getElementById("password");
const logBtn = document.getElementById("loginBtn");





// LOGIN
logBtn.onclick = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, pass.value);
        alert("Giriş uğurlu!");
        email.value = "";
        pass.value = "";
        window.location.href = "../index.html"; // yönləndirmə
    } catch (err) {
        alert("Xəta: " + err.message);
    }
};
