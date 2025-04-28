import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB683u94pS4gbl0unWONc5YrfPzRbOJ4rE",
  authDomain: "atir-perfume-96ff0.firebaseapp.com",
  projectId: "atir-perfume-96ff0",
  storageBucket: "atir-perfume-96ff0.firebasestorage.app",
  messagingSenderId: "247004501859",
  appId: "1:247004501859:web:48b23da5484e43f617e556",
  measurementId: "G-T9B7B44MEJ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
