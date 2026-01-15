import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpPGxPicNuc2FTpNfbytfa6-PSSuBLOyE",
  authDomain: "nutriamiga-346b6.firebaseapp.com",
  projectId: "nutriamiga-346b6",
  storageBucket: "nutriamiga-346b6.firebasestorage.app",
  messagingSenderId: "875891828863",
  appId: "1:875891828863:web:51e0bd719cf5b7cb2bf74a",
  measurementId: "G-5JRVZ9QTYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, analytics };
