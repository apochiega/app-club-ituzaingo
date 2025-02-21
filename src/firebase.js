// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC27hfOn0woModAJM3q1Ma_esBbCeMndzI",
  authDomain: "padel-app-979cb.firebaseapp.com",
  projectId: "padel-app-979cb",
  storageBucket: "padel-app-979cb.firebasestorage.app",
  messagingSenderId: "944620952732",
  appId: "1:944620952732:web:8d693116262d72a49d6159",
  measurementId: "G-55NT3WY3Q5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app};