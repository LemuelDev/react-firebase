// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD6N6rpYb8J0a161CDbbAA80xTGSmoBz8o",
  authDomain: "fir-tutorial-71fc8.firebaseapp.com",
  projectId: "fir-tutorial-71fc8",
  storageBucket: "fir-tutorial-71fc8.appspot.com",
  messagingSenderId: "362013096228",
  appId: "1:362013096228:web:227cd8481c02bc31f99bb1",
  measurementId: "G-G77V78F9YZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authentication
export const auth = getAuth(app)
// google auth
export const googleProvider = new GoogleAuthProvider()
// firestore database nosql
export const db = getFirestore(app)
// storage for upload
export const storage = getStorage(app)