import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIiMwTZrXS7gvpMaEdNN4mNYOiVWiZ2Vk",
  authDomain: "feedback-ddcff.firebaseapp.com",
  projectId: "feedback-ddcff",
  storageBucket: "feedback-ddcff.appspot.com",
  messagingSenderId: "1074862985114",
  appId: "1:1074862985114:web:17065e85ea586af178f423",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
