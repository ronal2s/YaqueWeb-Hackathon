import firebase from 'firebase/app';
import moment from "moment";
import "firebase/auth";
import "firebase/firestore";

import { Collections, Documents } from "../utils/enums";

const firebaseConfig = {
    apiKey: "AIzaSyBXnVrMt6dqx9mFtprP97vvsjTCSOMPzL0",
    authDomain: "rioyaque-20150.firebaseapp.com",
    projectId: "rioyaque-20150",
    storageBucket: "rioyaque-20150.appspot.com",
    messagingSenderId: "863809874074",
    appId: "1:863809874074:web:24944e2cb1a99f64259723"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();


export const logout = () => {
    return firebase.auth().signOut()
}

export const getDb = () => { return db }

export const getData = async () => {
    // const data = await db.collection(Collections.REPORTS).doc(Documents.DATA).get();
    // return data.data();
    const data = await db.collection(Collections.REPORTS).doc(Documents.DATA).get();
    return db.collection(Collections.REPORTS).doc(Documents.DATA).onSnapshot
}

export const authenticate = (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
};