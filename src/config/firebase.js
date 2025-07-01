// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6srkMPm4DHlTDB95mRaPaUQbZqtI2jC4",
  authDomain: "fir-contactapp-fac3d.firebaseapp.com",
  projectId: "fir-contactapp-fac3d",
  storageBucket: "fir-contactapp-fac3d.firebasestorage.app",
  messagingSenderId: "410941782302",
  appId: "1:410941782302:web:88a479df37ec84defb310f",
  measurementId: "G-2EC1B6LC8H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);