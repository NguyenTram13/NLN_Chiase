// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyqQSuGIUxc4400FWZWDKkqW4UWOU5qT0",
  authDomain: "chiase-bbbe1.firebaseapp.com",
  projectId: "chiase-bbbe1",
  storageBucket: "chiase-bbbe1.appspot.com",
  messagingSenderId: "927088528220",
  appId: "1:927088528220:web:81e685fb9e67afe17c4f99",
  measurementId: "G-X1PXD2VTQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);