// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2iUcOM8eHH9N7sv5-MhwKNH5ZjTTR9DY",
  authDomain: "spatial-audio-test.firebaseapp.com",
  projectId: "spatial-audio-test",
  storageBucket: "spatial-audio-test.appspot.com",
  messagingSenderId: "906152247999",
  appId: "1:906152247999:web:a22daec7f0ce6785683c0a",
  measurementId: "G-7QLYXWC2PN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)