import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbXRDNgySole8mekGQSiNx2pR8ZhZzSRc",
  authDomain: "mygallery-b7667.firebaseapp.com",
  projectId: "mygallery-b7667",
  storageBucket: "mygallery-b7667.appspot.com",
  messagingSenderId: "744331160216",
  appId: "1:744331160216:web:4214fc77217e046e98feed",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

//create a collection for users
const userCollection = db.collection("users");
const imageCollection = db.collection("images");

export { auth, db, userCollection, storage, imageCollection };
