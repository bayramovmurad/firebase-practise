import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    getDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
const db = getFirestore(app);

const logoutBtn = document.getElementById("logoutBtn");
const adminLink = document.getElementById("adminLink");
const userInfo = document.getElementById("userInfo");
const addBtn = document.getElementById("addPostBtn");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");
const postsEl = document.getElementById("posts");
const loader = document.getElementById("loader");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Əvvəl giriş etməlisiniz!");
        window.location.href = "./auth/register.html";
    } else {
        currentUser = user;
        userInfo.textContent = "İstifadəçi: " + user.email;
    }
    loader.style.display = "none";
});

logoutBtn.onclick = async () => {
    await signOut(auth);
    window.location.href = "./auth/register.html";
};



function formatDate(ts) {
    if (!ts) return "Naməlum tarix";
    const date = ts.toDate();
    return date.toLocaleDateString("az-AZ", {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit"
    });
}

// 🔒 Post 
addBtn.onclick = async () => {
    if (!currentUser) {
        alert("You must be registered to create a post!");
        return;
    }
    const title = titleEl.value.trim();
    const text = textEl.value.trim();
    if (!title || !text) return alert("Bütün xanaları doldurun!");
    await addDoc(collection(db, "cards"), {
        title,
        text,
        user: currentUser.email,
        createdAt: serverTimestamp()
    });
    titleEl.value = "";
    textEl.value = "";
};

// 📡 Real-time 
const q = query(collection(db, "cards"), orderBy("createdAt", "desc"));
onSnapshot(q, (snap) => {
    postsEl.innerHTML = "";
    snap.forEach(doc => {
        const d = doc.data();
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
    <h3>${d.title}</h3>
    <p>${d.text}</p>
    <div class="meta">
        ${d.user ? `👤 ${d.user}` : "Anonim"} · 🕒 ${formatDate(d.createdAt)}
    </div>

    `;
        postsEl.appendChild(div);
    });
});


