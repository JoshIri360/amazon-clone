import firebase from "firebase"

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
  apiKey: "AIzaSyAXFzy2aQALnzA59ei7ZN9VAWumS9U8omA",
  authDomain: "clone-409105.firebaseapp.com",
  projectId: "amazon-clone-409105",
  storageBucket: "amazon-clone-409105.appspot.com",
  messagingSenderId: "336727715419",
  appId: "1:336727715419:web:7b817f24fed8e6028c997e",
  measurementId: "G-700RZGMYV6",
};
