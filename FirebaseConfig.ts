import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

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
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);