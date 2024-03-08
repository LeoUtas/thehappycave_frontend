// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqgJmv1hhAnxcTToMCfdqrmy3JbZogync",
    authDomain: "the-happy-cave.firebaseapp.com",
    projectId: "the-happy-cave",
    storageBucket: "the-happy-cave.appspot.com",
    messagingSenderId: "444926070436",
    appId: "1:444926070436:web:6ed34fddb850c21b74e031",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth } from "firebase/auth";

export const db = getFirestore(app);
export const auth = getAuth(app);
