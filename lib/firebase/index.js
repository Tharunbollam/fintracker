// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDt7zZf8deQ9NfYpid5lIKVroXYb2VfE4",
  authDomain: "financetracker-e087d.firebaseapp.com",
  projectId: "financetracker-e087d",
  storageBucket: "financetracker-e087d.appspot.com",
  messagingSenderId: "415313267716",
  appId: "1:415313267716:web:c6ab8c50be488ea51bb951"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app);

export {app,db,auth};