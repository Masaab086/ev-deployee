// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYtHWImpJi247b-E-bqG6IEZfBjny4PcQ",
  authDomain: "ev-charging-193b9.firebaseapp.com",
  projectId: "ev-charging-193b9",
  storageBucket: "ev-charging-193b9.appspot.com",
  messagingSenderId: "1059357773818",
  appId: "1:1059357773818:web:ec400ab4c5660659095e43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
