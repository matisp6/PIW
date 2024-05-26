import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtNTmzr-PLqMWBRyMqteNQhtlL4fklPJM",
    authDomain: "piw-tranquility.firebaseapp.com",
    projectId: "piw-tranquility",
    storageBucket: "piw-tranquility.appspot.com",
    messagingSenderId: "863614403205",
    appId: "1:863614403205:web:67960360363b25f2ae5fec",
    measurementId: "G-YYPFP3BSWM"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth(app);
  export const firestore = getFirestore(app);
  