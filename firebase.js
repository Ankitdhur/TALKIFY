// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import auth ->Step1
import { getAuth } from "firebase/auth";
//import FireStore DataBase ->Step-1
import { getFirestore } from "firebase/firestore";
// // Import the functions you need from the SDKs you need
//Import File Storage(FS)=>Step1
import { getStorage } from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//auth-Step2
const auth=getAuth(app);
//DB-Step2
const DB=getFirestore();
//FS-STEP-2
const storage = getStorage();
export {auth,DB, storage}