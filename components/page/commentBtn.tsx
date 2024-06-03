import { $FlatList, $Image, $Link, $Modal, $Text, $TextInput, $TouchableOpacity, $View } from '../NativeWind';
import { collection, doc, runTransaction, increment, getDocs, query, orderBy, limit, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { firebaseFirestore } from '@/FirebaseConfig';
import { useUserData } from '@/context/UserDataProvider';
import { CommentIcon, SendIcon } from '@/constants/SVG'
import { RefreshControl, PanResponder, Dimensions, Platform, TextStyle, } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { icons } from '@/constants';
import ShowPFP from './ShowPFP';

const commentBtn = ({ feedId }: { feedId: string, }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [showModal, setshowModal] = useState<boolean>(false);
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [txtInput, setTxtInput] = useState<string>('');
    const [comments, setComments] = useState<commentSchema[]>([]);
    const userData = useUserData();
    const [boxHeight, setBoxHeight] = useState(500);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
            },
            onPanResponderMove: (evt, gestureState) => {
                setBoxHeight(() => {
                    const windowHeight = Dimensions.get('window').height
                    const px = (windowHeight - gestureState.moveY)
                    const percentage = Math.round(px / windowHeight * 100)
                    const topPosition = Platform.OS === 'ios' ? (95 / 100 * windowHeight) : windowHeight
                    const bottomPosition = windowHeight * 0.55
                    if (percentage > (Platform.OS === 'ios' ? 95 : 100)) return topPosition
                    if (percentage < 55) return bottomPosition
                    return px
                });
            },
            onPanResponderRelease: (evt, gestureState) => {
                const windowHeight = Dimensions.get('window').height
                const px = (windowHeight - gestureState.moveY)
                const topPosition = Platform.OS === 'ios' ? (95 / 100 * windowHeight) : windowHeight
                const bottomPosition = windowHeight * 0.55
                if (gestureState.vy > 1.6) setBoxHeight(bottomPosition)
                if (gestureState.vy < -1.6) setBoxHeight(topPosition)
            }
        })
    ).current;


    async function getComments() {
        const commentsCollection = collection(firebaseFirestore, "feeds", feedId, 'comments')
        const q = query(commentsCollection, orderBy('createdAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        setComments(querySnapshot.docs.map(doc => doc.data() as commentSchema));
    }
    async function refresh() {
        setRefreshing(true);
        await getComments();
        setRefreshing(false);
    }
    interface commentSchema {
        createdAt: Timestamp
        comment: string
        uid: string
        userName: string
        pfp: string
        name: string
    }
    async function addComment() {
        if (userData === null || txtInput === '') return;
        const commentsCollection = collection(firebaseFirestore, "feeds", feedId, 'comments')
        const q = query(commentsCollection, orderBy('createdAt', 'desc'), limit(10));
        setDisableBtn(true);
        await addDoc(commentsCollection, {
            createdAt: serverTimestamp(),
            comment: txtInput,
            uid: userData.uid,
            userName: userData.userName,
            pfp: userData.pfp,
            name: userData.name
        });
        setComments([({
            createdAt: Timestamp.now(),
            comment: txtInput,
            uid: userData.uid,
            userName: userData.userName,
            pfp: userData.pfp,
            name: userData.name
        } as commentSchema), ...comments]);
        setTxtInput('');
        setDisableBtn(false);

    }



    return (
        <>
            <$View className={` rounded-full flex-row justify-center items-center mt-2`}>
                <$TouchableOpacity
                    className='mr-1'
                    onPress={() => {
                        setshowModal(!showModal);
                        getComments();
                    }}
                >
                    <CommentIcon height={30} width={30} />
                </$TouchableOpacity>
            </$View>
            <$Modal
                statusBarTranslucent={true}
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setshowModal(!showModal);
                }}>

                <$View className='flex-1 absolute bottom-0 justify-center items-center'>
                    <$View
                        className='bg-dark w-full lg:w-1/2 border-t-[6px] border-r-2 border-l-2  border-white rounded-t-3xl'
                        style={{ height: boxHeight, minHeight: boxHeight, maxHeight: boxHeight, cursor: 'pointer' }}
                    >
                        <$View
                            {...panResponder.panHandlers}
                            className=' w-full  rounded-full'
                        >
                            <$TouchableOpacity
                                className='bg-white rounded-full justify-center items-center mt-2 mr-3 h-8 w-8 self-end'
                                onPress={() => setshowModal(!showModal)}>
                                <$Text className='text-xl' >X</$Text>
                            </$TouchableOpacity>
                        </$View>
                        <$View className='flex-row  bg-dark w-full border-b-[1px] border-neutral-400 pb-2 justify-between items-center'>
                            <$View className='flex-row items-center w-9/12 ml-1 flex-1'>
                                <ShowPFP size='h-14 w-14' URL={userData?.pfp} />
                                <$View className='flex-1'>
                                    <$Text className='text-white text-base ml-2'>{userData?.name}</$Text>
                                    <$Text className='ml-2 text-secondary-100 text-xs'>@{userData?.userName}</$Text>
                                    <$TextInput
                                        style={[Platform.OS === 'web' ? { outlineStyle: 'none', flex: 1 } as TextStyle : { borderColor: '#000' }, { scrollbarWidth: 'none' } as TextStyle]}
                                        className='ml-2 text-white text-base'
                                        numberOfLines={Platform.OS === 'web' ? 3 : undefined}
                                        placeholderTextColor={'#FFF'}
                                        multiline
                                        onChangeText={setTxtInput}
                                        value={txtInput}
                                        placeholder='Add a comment'
                                    />
                                </$View>
                            </$View>
                            <$TouchableOpacity
                                disabled={disableBtn}
                                onPress={addComment}
                                className='self-end mr-2 rounded-full pb-2'
                            >
                                <SendIcon height={33} width={33} />
                            </$TouchableOpacity>
                        </$View>
                        <$FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={refresh}
                                    tintColor="#FFF" // iOS
                                />
                            }
                            data={comments}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <$View className='flex-row pt-2 pb-2 border-b-[1px] border-neutral-400'>
                                    <$View className=' self-center ml-2'>
                                        <ShowPFP size='h-14 w-14' URL={(item as commentSchema).pfp} />
                                    </$View>
                                    <$View className='pr-4 ml-2 flex-1 '>
                                        <$Text className='text-white text-base'>{(item as commentSchema).name}</$Text>
                                        <$Link
                                            href={{ pathname: "(userProfile)/[userName]", params: { userName: (item as commentSchema).userName } }}
                                        >
                                            <$Text className='text-secondary-100 text-xs'
                                            >@{(item as commentSchema).userName}
                                            </$Text>
                                        </$Link>
                                        <$Text className='text-white text-sm'>{(item as commentSchema).comment}</$Text>
                                    </$View>
                                </$View>
                            )}
                        />
                    </$View>
                </$View>
            </$Modal>
        </>
    );
};


export default commentBtn;
