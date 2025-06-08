// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHQR5rpXNFfVyHXn8XJrfdTbeCdsF6ezk",
  authDomain: "qard-528cf.firebaseapp.com",
  projectId: "qard-528cf",
  storageBucket: "qard-528cf.firebasestorage.app",
  messagingSenderId: "865371079011",
  appId: "1:865371079011:web:37944488db7b0d1a095356"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
