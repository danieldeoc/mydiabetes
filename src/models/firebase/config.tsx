// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClYvwf_w6epu04saXouIamo_L2UhlCkqs",
  authDomain: "mydiabetes-78097.firebaseapp.com",
  projectId: "mydiabetes-78097",
  storageBucket: "mydiabetes-78097.appspot.com",
  messagingSenderId: "124603852203",
  appId: "1:124603852203:web:7c78894a586dd3fa8f1eee",
  measurementId: "G-7WPXVN1SG2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);