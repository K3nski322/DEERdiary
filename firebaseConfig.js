// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO8Jl-HN2IGvO_c5uVEXXwPTWVh_TlwqM",
  authDomain: "deerdiary-a47c0.firebaseapp.com",
  projectId: "deerdiary-a47c0",
  storageBucket: "deerdiary-a47c0.appspot.com", // ⚠️ fix: remove "firebasestorage.app"
  messagingSenderId: "334139373865",
  appId: "1:334139373865:web:ea8d5c1ce052f89ba51f38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth + Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- export Firestore

export default app;
