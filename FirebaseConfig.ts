import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, where, query, orderBy, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { UserSchema, AuthContextSchema, FeedSchema } from '@/context/schema'
const firebaseConfig = {
    apiKey: "AIzaSyBH8mWXeQ-rPT7JvYIFG4dQ3gublhyLJ5o",
    authDomain: "portal-react-native.firebaseapp.com",
    projectId: "portal-react-native",
    storageBucket: "portal-react-native.appspot.com",
    messagingSenderId: "823959883051",
    appId: "1:823959883051:web:9c4c7a0f5476afbbc1c96e",
    measurementId: "G-CPF7MKRSJK"
};

export const firebaseApp = initializeApp(firebaseConfig);


import { initializeAuth, getReactNativePersistence, type Auth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";
import { getAuth } from 'firebase/auth/web-extension';

export let firebaseAuth: Auth;
if (Platform.OS === 'web') {
    firebaseAuth = getAuth(firebaseApp);
    console.log('web')
} else {
    firebaseAuth = initializeAuth(firebaseApp, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });
}

export async function getUserProfileData(uid: string) {
    const docRef = doc(firebaseFirestore, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as UserSchema;
}

export async function getUserFeedData(uid: string) {
    const q = query(
        collection(firebaseFirestore, "feeds"),
        where("uid", "==", uid),
        orderBy('createdAt')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), feedId: doc.id }) as FeedSchema);

}
export async function getDownloadUrl(path: string) {
    const url = await getDownloadURL(ref(firebaseStorage, path));
    return url;

}

export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);