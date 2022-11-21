// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_APP_ID,
  apiKey: "AIzaSyCKE2ebQ7v-zbB7q2SmZRdL7-tvsUpRcV8",
  authDomain: "thought-9fb64.firebaseapp.com",
  projectId: "thought-9fb64",
  storageBucket: "thought-9fb64.appspot.com",
  messagingSenderId: "681425037486",
  appId: "1:681425037486:web:20694b0a63a2ead795653f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
