// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const VITE_API_KEY = import.meta.env.VITE_API_KEY;
// const VITE_AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
// const VITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
// const VITE_MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID;
// const VITE_APP_ID = import.meta.env.VITE_APP_ID;
// const VITE_MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: "AIzaSyCSPysWpx66tR9Qbl0ma1WAhx1LV40lnZ0",
  authDomain: "seat-arrangement-d4794.firebaseapp.com",
  projectId: "seat-arrangement-d4794",
  storageBucket: "seat-arrangement-d4794.appspot.com",
  messagingSenderId: "1072899449861",
  appId: "1:1072899449861:web:3db29346a247685e87286c",
  measurementId: "G-WPM884F8HG",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db1 = getFirestore(firebaseApp);
export const auth1 = getAuth(firebaseApp);
