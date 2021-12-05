import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCHvBMMGtHDKY6tCNijs1ZNOfT1t_WEh8E",
  authDomain: "mymoney-e0ca8.firebaseapp.com",
  projectId: "mymoney-e0ca8",
  storageBucket: "mymoney-e0ca8.appspot.com",
  messagingSenderId: "233520614733",
  appId: "1:233520614733:web:897145f99e688afb653b04",
};

// initializing the firebase
firebase.initializeApp(firebaseConfig);
//initializing the firestore
const projectFireStore = firebase.firestore();
// initializing the firebase authentication
const projectAuth = firebase.auth();

export { projectFireStore, projectAuth };
