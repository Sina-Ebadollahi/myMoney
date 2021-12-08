import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  // config
};

// initializing the firebase
firebase.initializeApp(firebaseConfig);
//initializing the firestore
const projectFireStore = firebase.firestore();
// initializing the firebase authentication
const projectAuth = firebase.auth();

export { projectFireStore, projectAuth };
