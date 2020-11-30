import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB7qbGwkFNO4TlqQMu9GkdbcsjRBmiaH3Y",
  authDomain: "vue-c-91a35.firebaseapp.com",
  databaseURL: "https://vue-c-91a35.firebaseio.com",
  projectId: "vue-c-91a35",
  storageBucket: "vue-c-91a35.appspot.com",
  messagingSenderId: "415069097382",
  appId: "1:415069097382:web:4b8cbb76cb4a0106b15367",
  measurementId: "G-QRENT2T1D1"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDB = firebaseApp.database();

export {
  firebaseAuth,
  firebaseDB
};
