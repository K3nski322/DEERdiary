// firebaseConfig.js

<<<<<<< HEAD
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- add this
=======
// Import Firebase core
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import authentication
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO8Jl-HN2IGvO_c5uVEXXwPTWVh_TlwqM",
  authDomain: "deerdiary-a47c0.firebaseapp.com",
  projectId: "deerdiary-a47c0",
<<<<<<< HEAD
  storageBucket: "deerdiary-a47c0.appspot.com", // ⚠️ fix: remove "firebasestorage.app"
=======
  storageBucket: "deerdiary-a47c0.firebasestorage.app",
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
  messagingSenderId: "334139373865",
  appId: "1:334139373865:web:ea8d5c1ce052f89ba51f38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

<<<<<<< HEAD
// ✅ Auth + Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- export Firestore
=======
// ✅ Initialize Firebase Authentication and export it
export const auth = getAuth(app);
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c

export default app;
