// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSSOHiggIEicwiZRz4UnjREv1tLJ1YQ08",
  authDomain: "chia-6131e.firebaseapp.com",
  projectId: "chia-6131e",
  storageBucket: "chia-6131e.firebasestorage.app",
  messagingSenderId: "1068128182398",
  appId: "1:1068128182398:web:4894b228e7822eba70782f",
  measurementId: "G-WS0KYMY1XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);