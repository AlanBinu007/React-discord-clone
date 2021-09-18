import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//GET Below Settings from Firebase > Project Overview > Settings > General > Your apps > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "AIzaSyDC_O7A0m2570Qgi_lgetjOuWOzD-YG2uw",
  authDomain: "alanbinu-discord.firebaseapp.com",
  projectId: "alanbinu-discord",
  storageBucket: "alanbinu-discord.appspot.com",
  messagingSenderId: "18335583725",
  appId: "1:18335583725:web:e0ae17ac99468f9390abe4",
  measurementId: "G-E01KDMM4CE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
