import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBks_-NUhjAa-ReqFjHuwmMo_OVo_FL3hE",
    authDomain: "react-native-social-a35e5.firebaseapp.com",
    projectId: "react-native-social-a35e5",
    storageBucket: "react-native-social-a35e5.appspot.com",
    messagingSenderId: "458968288606",
    appId: "1:458968288606:web:32103d80b2510102b7d3cf",
    measurementId: "G-TPQZR42LTB"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, storage, db};