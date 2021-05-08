import firebase from "firebase";
require("@firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyABfSQtiBQ2giJ2GCqv8yilekL6i2n9peY",
  authDomain: "community-santa-8bfcf.firebaseapp.com",
  projectId: "community-santa-8bfcf",
  storageBucket: "community-santa-8bfcf.appspot.com",
  messagingSenderId: "480038748647",
  appId: "1:480038748647:web:4503b3f36bd922d3f33d42",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();