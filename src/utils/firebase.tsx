// Import the functions you need from the SDKs 
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth' 
import 'firebase/auth'
import { firebaseConfig } from "../config";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//gmail
export const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => signInWithPopup(auth, provider) 

export const firebaseSignOut =  () => signOut(auth)

