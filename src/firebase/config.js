// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfIJCHCCJnKsO2V2XlTmlGSSgsjd1nrDc",
  authDomain: "journal-app-c8d7c.firebaseapp.com",
  projectId: "journal-app-c8d7c",
  storageBucket: "journal-app-c8d7c.appspot.com",
  messagingSenderId: "864221835394",
  appId: "1:864221835394:web:195b7016aa22b1af28c49b",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )