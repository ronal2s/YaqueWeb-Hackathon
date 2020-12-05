import firebase from 'firebase/app';
import moment from "moment";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { Collections, Documents } from "../utils/enums";
import { IFNews } from '../utils/interfaces';

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

export const pushNewsv2 = async (post: IFNews) => {
    let obj = await (await db.collection(Collections.NEWS).doc(Documents.DATA).get()).data();
    let code = + new Date();
    let _post = { ...post };
    // const storageUser = firebase.storage().ref(`news`);
    const storageUser = firebase.storage().ref(`news/${code}`);

    if (post.uri !== "") {
        const img = await storageUser.putString(post.uri, "data_url");
        const imageUrl = await img.ref.getDownloadURL();
        _post.uri = imageUrl;
    }
    if (!obj) {
        obj = []
    } else {
        const keysObject = Object.keys(obj);
        const auxObjects = { ...obj };
        obj = [];
        keysObject.forEach(key => {
            //@ts-ignore
            obj.push(auxObjects[key])
        })
    }
    obj.push(_post);
    return db.collection(Collections.NEWS).doc(Documents.DATA).set({ ...obj });

}

export const pushNews = async (post: IFNews) => {
    let obj = await (await db.collection(Collections.NEWS).doc(Documents.DATA).get()).data();
    console.log(obj)
    if (!obj) {
        // obj = {
        //     data: []
        // }
        obj = []
    } else {
        const keysObject = Object.keys(obj);
        const auxObjects = { ...obj };
        obj = [];
        keysObject.forEach(key => {
            //@ts-ignore
            obj.push(auxObjects[key])
        })
    }
    console.log("Data: ", obj)
    // obj.data.push(post);
    obj.push(post);
    return db.collection(Collections.NEWS).doc(Documents.DATA).set({ ...obj });
    // const _post = { ...post };
    // const storageUser = firebase.storage().ref(`news/${code}`);
    // if (post.uri !== "") {
    //     const img = await storageUser.put()
    // }
}

export const getNews = async () => {
    let obj: any = await (await db.collection(Collections.NEWS).doc(Documents.DATA).get()).data() as object;
    const keysObject = Object.keys(obj);
    const auxObjects = { ...obj };
    obj = [];
    keysObject.forEach(key => {
        //@ts-ignore
        obj.push(auxObjects[key])
    })
    return obj;
}