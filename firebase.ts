import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: "clone-6ce19.firebaseapp.com",
  projectId: "clone-6ce19",
  storageBucket: "clone-6ce19.appspot.com",
  messagingSenderId: "689573512188",
  appId: "1:689573512188:web:690fc323b1d67bfab96879",
  measurementId: "G-P6J8CE4E8L",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = app.firestore();

export default db;
