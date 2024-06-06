// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAIwpSbmIWXEDyxZj9X6smujaKEs-z6q0Y",
    authDomain: "fir-pro-d9313.firebaseapp.com",
    projectId: "fir-pro-d9313",
    storageBucket: "fir-pro-d9313.appspot.com",
    messagingSenderId: "1029020322749",
    appId: "1:1029020322749:web:f5216fca3e24d313c4e0d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authentication hizmetinin referansını al
export const auth = getAuth(app);

// google sağlayıcısının kurlumunu yap
export const provider = new GoogleAuthProvider();

// veritabanı hizemetinin referansını al
export const db = getFirestore(app);