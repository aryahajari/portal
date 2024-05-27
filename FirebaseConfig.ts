import { initializeApp } from "firebase/app";
import { CACHE_SIZE_UNLIMITED, initializeFirestore, doc, getDoc, collection, where, query, orderBy, getDocs, serverTimestamp, getCountFromServer, setDoc, limit, Query, setLogLevel } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, getMetadata } from 'firebase/storage'
import { UserSchema, AuthContextSchema, FeedSchema, FeedDbSchema } from '@/context/schema'
const firebaseConfig = {
    databaseURL: 'https://portal-react-native.firebaseio.com',
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
import { Timestamp } from "@google-cloud/firestore";

export let firebaseAuth: Auth;
if (Platform.OS === 'web') {
    firebaseAuth = getAuth(firebaseApp);
} else {
    firebaseAuth = initializeAuth(firebaseApp,
        { persistence: getReactNativePersistence(ReactNativeAsyncStorage) }
    );
}

export async function getUserProfileData(uid: string) {
    const docRef = doc(firebaseFirestore, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as UserSchema;
}
export async function getFollowingFeedData(followingList: string[], lastFeedSeen: Timestamp | undefined) {
    let feedQuery;
    if (lastFeedSeen) {
        feedQuery = query(
            collection(firebaseFirestore, "feeds"),
            where("uid", "in", followingList),
            where("createdAt", "<", lastFeedSeen),
            orderBy('createdAt', 'desc'),
            limit(10)
        );
    } else {
        feedQuery = query(
            collection(firebaseFirestore, "feeds"),
            where("uid", "in", followingList),
            orderBy('createdAt', 'desc'),
            limit(10)
        );
    }
    try {
        const querySnapshot = await getDocs(feedQuery);
        const feeds = querySnapshot.docs.map(doc => ({ ...doc.data(), feedId: doc.id }) as FeedDbSchema);
        const enhancedFeeds = feeds.map(async feed => {
            if (!feed.img) return feed;
            try {
                const img = await getImg(feed.img);
                return { ...feed, img };
            } catch (imgError) {
                console.log('errrrrrr')
                console.error('Error fetching image:', imgError);
                // Optionally handle the error e.g., by setting a default image or logging the error
                return { ...feed, img: 'default-image-path-or-data' };
            }
        });
        const ret = await Promise.all(enhancedFeeds) as FeedSchema[];
        return ret;
    } catch (error) {
        console.log('errrrrrr2')
        console.error('Failed to fetch feeds:', error);
        // Handle the error appropriately
        // You might want to throw the error or return a default value
        throw new Error('Unable to fetch feed data');
    }
}

export async function getUserFeedData(uid: string): Promise<FeedSchema[]> {
    const feedQuery = query(
        collection(firebaseFirestore, "feeds"),
        where("uid", "==", uid),
        orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(feedQuery);
    const feeds = querySnapshot.docs.map(doc => ({ ...doc.data(), feedId: doc.id }) as FeedDbSchema);

    const enhancedFeeds = feeds.map(async feed => {
        if (!feed.img) return feed;
        const img = await getImg(feed.img);
        return { ...feed, img };
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
export async function getFollowerNumber(uid: string) {
    const q = query(collection(firebaseFirestore, "users"),
        where("following", "array-contains", uid)
    );
    const num = await getCountFromServer(q);
    return num.data();
}
export async function getImg(path: string) {
    const url = await getDownloadURL(ref(firebaseStorage, path));
    const metadata = await getMetadata(ref(firebaseStorage, path));
    const type = metadata?.contentType?.split('/')[0];
    const aspectRatio = Number(metadata?.customMetadata?.aspectRatio);
    return { url, aspectRatio, type };
}
export async function getPfp(path: string) {
    const url = await getDownloadURL(ref(firebaseStorage, path));
    return url;
}
export async function updateUserLastFeedSeen(uid: string) {
    const userDoc = doc(firebaseFirestore, "users", uid);
    await setDoc(userDoc, { lastFeedSeen: serverTimestamp() }, { merge: true });

}

//export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseFirestore = initializeFirestore(firebaseApp, {
    // experimentalAutoDetectLongPolling: true,
    //ignoreUndefinedProperties: true,
    experimentalLongPollingOptions: { timeoutSeconds: 30 },
    experimentalForceLongPolling: true,
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
})
export const firebaseStorage = getStorage(firebaseApp);
setLogLevel('debug');