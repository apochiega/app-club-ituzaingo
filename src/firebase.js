// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfvqFyVN6i0S08xMzEwsSJcDuW6Aa4rk4",
  authDomain: "clubituzaingopadel.firebaseapp.com",
  projectId: "clubituzaingopadel",
  storageBucket: "clubituzaingopadel.firebasestorage.app",
  messagingSenderId: "1083190847956",
  appId: "1:1083190847956:web:81d4d3be563dcb422a8e41",
  measurementId: "G-SV339RJECP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app};