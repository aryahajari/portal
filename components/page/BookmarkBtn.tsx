import React, { useEffect } from 'react';
import { $Image, $Text, $TouchableOpacity, $View } from '../NativeWind';
import { icons } from '@/constants';
import { collection, doc, setDoc, getDoc, deleteDoc, runTransaction, increment, serverTimestamp } from 'firebase/firestore';
import { firebaseFirestore } from '@/FirebaseConfig';
import { useUserData } from '@/context/UserDataProvider';
import Svg, { Path } from 'react-native-svg';
const YourComponent = ({ feedId }: { feedId: string, }) => {
    const userData = useUserData();
    const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false);
    const [disableBtn, setDisableBtn] = React.useState<boolean>(false);
    useEffect(() => {
        checkIsBookmarked();
    }, []);
    async function checkIsBookmarked() {
        if (userData === null) return;
        try {
            const bookmarkDocRef = doc(collection(firebaseFirestore, "users", userData.uid, 'bookmarks'), feedId);
            setDisableBtn(true);
            const docSnap = await getDoc(bookmarkDocRef);
            setDisableBtn(false);
            if (docSnap.exists()) {
                setIsBookmarked(true);
            }
        } catch (err) {
            console.error(err);
        }
    }
    async function unSaveFeed() {
        if (userData === null) return;
        const bookmarkDocRef = doc(collection(firebaseFirestore, "users", userData.uid, 'bookmarks'), feedId);
        setDisableBtn(true);
        await deleteDoc(bookmarkDocRef);
        setIsBookmarked(false);
        setDisableBtn(false);
    }
    async function saveFeed() {
        if (userData === null) return;
        setDisableBtn(true);
        const bookmarkDocRef = doc(collection(firebaseFirestore, "users", userData.uid, 'bookmarks'), feedId);
        await setDoc(bookmarkDocRef, { savedAt: serverTimestamp(), saved: true });
        setIsBookmarked(true);
        setDisableBtn(false);
    }
    const Like = () => {
        return (
            <Svg height="24px" viewBox="0 0 24 24" width="24px" fill={`${isBookmarked ? '#1fbf3a' : '#FFF'}`}>
                <Path d="M0 0h24v24H0z" fill="none" />
                <Path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </Svg>
        )
    }
    return (
        <$View className={` rounded-full flex-row justify-center items-center mt-2`}>
            <$TouchableOpacity
                className='mr-1'
                disabled={disableBtn}
                onPress={isBookmarked ? unSaveFeed : saveFeed}
            >
                <Like />
            </$TouchableOpacity>
        </$View>);
};

export default YourComponent;
