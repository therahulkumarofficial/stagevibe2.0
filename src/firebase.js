// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSj_jr5o59h6YnX3ZzuAs-MdeLnoT84ac",
  authDomain: "stagevibe-70994.firebaseapp.com",
  databaseURL: "https://stagevibe-70994-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stagevibe-70994",
  storageBucket: "stagevibe-70994.appspot.com",
  messagingSenderId: "878898135898",
  appId: "1:878898135898:web:be9d354447455951052963"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;