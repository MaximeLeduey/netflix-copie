// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC72w5VIlQ58M6Z_N1kHNbSOHCQo_Xc_P4",
  authDomain: "copie-netflix.firebaseapp.com",
  projectId: "copie-netflix",
  storageBucket: "copie-netflix.appspot.com",
  messagingSenderId: "859780559112",
  appId: "1:859780559112:web:0fa7b3dcfeb994c7b2bcbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth; 