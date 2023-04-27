import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGxYenEMaOU9Crq9WBqw8cwGtd3ka7a4I",
  authDomain: "ibase-9c2c4.firebaseapp.com",
  databaseURL: "https://ibase-9c2c4.firebaseio.com",
  projectId: "ibase-9c2c4",
  storageBucket: "ibase-9c2c4.appspot.com",
  messagingSenderId: "793444548519",
  appId: "1:793444548519:web:1ff91b2f8e150fbc664082"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();