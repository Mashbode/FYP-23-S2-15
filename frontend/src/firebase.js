// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  //   apiKey: process.env.REACT_APP_FIREBASE_KEY,
  apiKey: "AIzaSyDci0zU7XHBRszlqqBVLUmM3D3yA_rfIWo",
  authDomain: "tutorial-40ef8.firebaseapp.com",
  projectId: "tutorial-40ef8",
  storageBucket: "tutorial-40ef8.appspot.com",
  messagingSenderId: "969101825958",
  appId: "1:969101825958:web:89251a611944ffa529e167",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
