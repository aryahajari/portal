import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, doc, getDoc, collection, where, query, orderBy, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, getMetadata } from 'firebase/storage'
import { UserSchema, AuthContextSchema, FeedSchema, FeedDbSchema } from '@/context/schema'
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

export async function getUserFeedData(uid: string): Promise<FeedSchema[]> {
    const feedQuery = query(
        collection(firebaseFirestore, "feeds"),
        where("uid", "==", uid),
        orderBy('createdAt')
    );

    const querySnapshot = await getDocs(feedQuery);
    const feeds = querySnapshot.docs.map(doc => ({ ...doc.data(), feedId: doc.id }) as FeedDbSchema);

    const enhancedFeeds = feeds.map(async feed => {
        if (!feed.img) return feed;

        const { url, aspectRatio } = await getImg(feed.img);
        return { ...feed, img: { url, aspectRatio } };
    });

    return await Promise.all(enhancedFeeds) as FeedSchema[];
}
export async function getUidFromUserName(userName: string): Promise<string | null> {
    try {
        const userQuery = query(
            collection(firebaseFirestore, "users"),
            where("userName", "==", userName)
        );
        const querySnapshot = await getDocs(userQuery);
        if (querySnapshot.empty) {
            return null;
        }
        const userDoc = querySnapshot.docs[0].data() as UserSchema;
        return userDoc.uid;
    } catch (error) {
        console.error('Failed to retrieve user UID:', error);
        throw new Error('Error retrieving user UID from Firestore.');
    }
}
export async function getImg(path: string) {
    const url = await getDownloadURL(ref(firebaseStorage, path));
    const metadata = await getMetadata(ref(firebaseStorage, path));
    const aspectRatio = Number(metadata?.customMetadata?.aspectRatio);
    return { url, aspectRatio };
}

export const firebaseFirestore = getFirestore(firebaseApp);

export const firebaseStorage = getStorage(firebaseApp);