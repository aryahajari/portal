import React, { useEffect } from 'react';
import { $Text, $TouchableOpacity, $View } from '../NativeWind';
import { collection, doc, getDoc, runTransaction, increment } from 'firebase/firestore';
import { firebaseFirestore } from '@/FirebaseConfig';
import { useUserData } from '@/context/UserDataProvider';
import Svg, { Path } from 'react-native-svg';
import { LikeIcon } from '@/constants/SVG';
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

    return (
        <$View className={` rounded-full flex-row justify-center items-center mt-2`}>
            <$TouchableOpacity
                className='mr-1'
                disabled={disableBtn}
                onPress={isLiked ? unLikeFeed : likeFeed}
            >
                <LikeIcon height={33} width={33} isLiked={isLiked} />
            </$TouchableOpacity>
            <$Text className='text-xs text-white'>{Numlikes}</$Text>
        </$View>);
};

export default Like;
