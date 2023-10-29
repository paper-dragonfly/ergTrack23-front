// Import the functions you need from the SDKs 
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { Auth, GoogleAuthProvider, connectAuthEmulator, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { firebaseConfig } from "../config";

let auth: Auth;
const app = initializeApp(firebaseConfig);


// Check if running on localhost and use the emulator
if (window.location.hostname === "localhost") {
    console.log("Using the local emulator for Firebase Auth");
    auth = getAuth();
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
} else {
    auth = getAuth(app);
}

//gmail
export const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => signInWithPopup(auth, provider)

export const firebaseSignOut = () => signOut(auth)

export { auth };
