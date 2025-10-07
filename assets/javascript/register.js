
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
const regBtn = document.getElementById("registerBtn");


// 🔒 Əgər artıq login olubsa → dərhal index.html-ə yönləndir
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "./login.html";
    }
});

// REGISTER
regBtn.onclick = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email.value, pass.value);
        alert("Qeydiyyat uğurlu! İndi giriş edin.");
        email.value = "";
        pass.value = "";
    } catch (err) {
        alert("Xəta: " + err.message);
    }
};

