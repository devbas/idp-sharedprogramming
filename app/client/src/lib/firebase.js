import firebase from 'firebase'
let config = {
  apiKey: "AIzaSyCJWeFGQSKVNtPPzhXmUeJLM1sOe60g-qM",
  authDomain: "uvasharedprogramming.firebaseapp.com",
  databaseURL: "https://uvasharedprogramming.firebaseio.com",
  projectId: "uvasharedprogramming",
  storageBucket: "uvasharedprogramming.appspot.com",
  messagingSenderId: "104335680930"
};

firebase.initializeApp(config);

export default firebase

