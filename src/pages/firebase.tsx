// Import the functions you need from the SDKs 
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth' 
import 'firebase/auth'

// Your web app's Firebase configuration
// TODO move to hidden config 
const firebaseConfig = {
    apiKey: "AIzaSyDRLMm7fq5w9LmOzO9YWuLl9OVdkYenccQ",
    authDomain: "ergtracker.firebaseapp.com",
    projectId: "ergtracker",
    storageBucket: "ergtracker.appspot.com",
    messagingSenderId: "638871380613",
    appId: "1:638871380613:web:2a94f8e2a4f7b0e3e63fec"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//gmail
export const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => signInWithPopup(auth, provider) 

export const firebaseSignOut =  () => signOut(auth)