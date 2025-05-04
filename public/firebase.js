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
  apiKey: "AIzaSyA5X_ytIckQCgCwsDkqTYDVZw1ZKnHhgF8",
  authDomain: "talkify-5af79.firebaseapp.com",
  projectId: "talkify-5af79",
  storageBucket: "talkify-5af79.firebasestorage.app",
  messagingSenderId: "477536487489",
  appId: "1:477536487489:web:1e56264daf3826e87c1ec0",
  measurementId: "G-P81GSENFX8"
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