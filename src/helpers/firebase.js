import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDVLA2rijLqGoQA5kUGqp2EygRDs1R8gKE",
    authDomain: "timbletask-e1763.firebaseapp.com",
    databaseURL: "https://timbletask-e1763.firebaseio.com",
    projectId: "timbletask-e1763",
    storageBucket: "",
    messagingSenderId: "629549948733",
    appId: "1:629549948733:web:1320eb3ce7fa1507"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const taskRef = firebase.database().ref('Tasks');