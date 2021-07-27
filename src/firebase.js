import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAmrzFdNfBnrIWyAFV5M9_p7HO7o-T6V0I",
    authDomain: "chatbox-application-6e080.firebaseapp.com",
    projectId: "chatbox-application-6e080",
    storageBucket: "chatbox-application-6e080.appspot.com",
    messagingSenderId: "522162012590",
    appId: "1:522162012590:web:b94ce22e58793b3ddc083f",
    measurementId: "G-XHM3L9JNWN"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;