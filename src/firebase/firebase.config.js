// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbQwYQcp0B_UNqrBzmvfSHose5Y4ArKcw",
  authDomain: "sistcom-d3a18.firebaseapp.com",
  projectId: "sistcom-d3a18",
  storageBucket: "sistcom-d3a18.appspot.com",
  messagingSenderId: "970290231904",
  appId: "1:970290231904:web:c5491e2f00481256b16105",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
/*
 TO TEST BUILD FOLDER ON LOCAL
 npx firebase emulators:start
 
 TO DEPLOY BUILD FOLDER 
 npx firebase deploy --only hosting
 
 
 */
