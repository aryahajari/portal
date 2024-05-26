import React, { useEffect } from 'react';
import { $Text, $TouchableOpacity, $View } from '../NativeWind';
import { collection, doc, getDoc, runTransaction, increment } from 'firebase/firestore';
import { firebaseFirestore } from '@/FirebaseConfig';
import { useUserData } from '@/context/UserDataProvider';
import Svg, { Path } from 'react-native-svg';
const Like = ({ feedId }: { feedId: string, }) => {
    const useData = useUserData();
    const [isLiked, setIsLiked] = React.useState<boolean>(false);
    const [Numlikes, setNumLikes] = React.useState<number>(0);
    const [disableBtn, setDisableBtn] = React.useState<boolean>(false);
    useEffect(() => {
        checkIsLiked();
        getLikes();
    }, []);
    async function checkIsLiked() {
        if (useData === null) return;
        try {
            const LikeDocRef = doc(collection(firebaseFirestore, "feeds", feedId, 'likes'), useData.uid);
            setDisableBtn(true);
            const docSnap = await getDoc(LikeDocRef);
            setDisableBtn(false);
            if (docSnap.exists()) {
                setIsLiked(true);
            }
        } catch (err) {
            console.error(err);
        }
    }
    async function unLikeFeed() {
        if (useData === null) return;
        runTransaction(firebaseFirestore, async (transaction) => {
            const feedRef = doc(firebaseFirestore, "feeds", feedId);
            const likeDocRef = doc(collection(firebaseFirestore, "feeds", feedId, 'likes'), useData.uid);
            setDisableBtn(true);
            await transaction.delete(likeDocRef);
            await transaction.update(feedRef, { likes: increment(-1) });
            setNumLikes(Numlikes - 1);
            setIsLiked(false);
            setDisableBtn(false);
        });
    }
    async function likeFeed() {
        if (useData === null) return;
        runTransaction(firebaseFirestore, async (transaction) => {
            const feedRef = doc(firebaseFirestore, "feeds", feedId);
            const likeDocRef = doc(collection(firebaseFirestore, "feeds", feedId, 'likes'), useData.uid);
            setDisableBtn(true);
            await transaction.set(likeDocRef, { liked: true });
            await transaction.update(feedRef, { likes: increment(1) });
            setNumLikes(Numlikes + 1);
            setIsLiked(true);
            setDisableBtn(false);
        });
    }
    async function getLikes() {
        if (useData === null) return;
        const feedRef = doc(firebaseFirestore, "feeds", feedId);
        const docSnap = await getDoc(feedRef);
        if (docSnap.exists()) {
            setNumLikes(docSnap.data()?.likes || 0);
        }
    }
    const Like = () => {
        return (
            <Svg height="24px" viewBox="0 0 24 24" width="24px" fill={`${isLiked ? '#FF5733' : '#FFF'}`}><Path d="M0 0h24v24H0z" fill="none" /><Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></Svg>
        )
    }
    return (
        <$View className={` rounded-full flex-row justify-center items-center mt-2`}>
            <$TouchableOpacity
                className='mr-1'
                disabled={disableBtn}
                onPress={isLiked ? unLikeFeed : likeFeed}
            >
                <Like />
            </$TouchableOpacity>
            <$Text className='text-xs text-white'>{Numlikes}</$Text>
        </$View>);
};

export default Like;
