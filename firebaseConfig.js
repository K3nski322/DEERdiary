// firebaseConfig.js

// Import Firebase core
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO8Jl-HN2IGvO_c5uVEXXwPTWVh_TlwqM",
  authDomain: "deerdiary-a47c0.firebaseapp.com",
  projectId: "deerdiary-a47c0",
  storageBucket: "deerdiary-a47c0.firebasestorage.app",
  messagingSenderId: "334139373865",
  appId: "1:334139373865:web:ea8d5c1ce052f89ba51f38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Authentication and export it
export const auth = getAuth(app);

export default app;
