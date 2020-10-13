import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBpAbsuzWXCr5tmEsy9Uv6tc0Ab7PDP-a0",
    authDomain: "discord-clone-9fbde.firebaseapp.com",
    databaseURL: "https://discord-clone-9fbde.firebaseio.com",
    projectId: "discord-clone-9fbde",
    storageBucket: "discord-clone-9fbde.appspot.com",
    messagingSenderId: "641783278320",
    appId: "1:641783278320:web:973f104dbd0bc12888f035",
    measurementId: "G-BW2ZMNESFH"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default db;