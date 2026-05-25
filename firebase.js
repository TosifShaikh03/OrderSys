// =========================
// FIREBASE IMPORTS
// =========================

import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getFirestore,

    collection,

    addDoc,

    getDocs

}
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =========================
// FIREBASE CONFIG
// =========================

const firebaseConfig = {
    apiKey: "AIzaSyAUOToZY7XElolSapVZd_j3Mx5-0gsWKuQ",
    authDomain: "desikoncept-f5742.firebaseapp.com",
    projectId: "desikoncept-f5742",
    storageBucket: "desikoncept-f5742.firebasestorage.app",
    messagingSenderId: "24457513762",
    appId: "1:24457513762:web:cc14206c3bcc59d4b7b37b",
    measurementId: "G-FMNCW5P0T1"
};

// =========================
// INITIALIZE FIREBASE
// =========================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// =========================
// EXPORTS
// =========================

window.db = db;

window.collection = collection;

window.addDoc = addDoc;

window.getDocs = getDocs;