import { Platform, TextStyle } from 'react-native'
import { icons } from '@/constants';
import React, { useState } from 'react'
import GetPhoto from '@/components/create/GetPhoto'
import ShowPFP from '@/components/page/ShowPFP';
import { useUserData } from '@/context/UserDataProvider';
import { useRouter } from 'expo-router'
import KeyboardCloser from '@/components/create/KeyboardCloser';
import { $Image, $ScrollView, $Text, $TextInput, $TouchableOpacity, $View } from '@/components/NativeWind';
//------------------------------------------------------------------------------------------------------------
import { ref, uploadBytesResumable } from 'firebase/storage'
import { serverTimestamp, collection, doc, runTransaction } from 'firebase/firestore';
import { firebaseFirestore } from '@/FirebaseConfig';
import { firebaseStorage } from '@/FirebaseConfig';
import { BackIcon, SendIcon } from '@/constants/SVG';
const create = () => {
    const router = useRouter();
    const userData = useUserData();
    const [caption, setCaption] = useState<string>('');
    interface imgSchema {
        file: Blob
        url: string
        aspectRatio: number
    }
    const [img, setImg] = useState<imgSchema | null>(null);
    const handleSubmit = async () => {
        if (!userData) return;
        const storageRef = ref(firebaseStorage, `${userData.uid}/${Date.now()}`);
        try {
            // Start a transaction
            await runTransaction(firebaseFirestore, async (transaction) => {
                let ref: null | string = null;
                if (img) {
                    const snapshot = await uploadBytesResumable(storageRef, img.file, { customMetadata: { 'aspectRatio': img.aspectRatio.toString() } });
                    ref = snapshot.ref.fullPath;
                }
                // Create a new document in feeds collection
                const feedsRef = doc(collection(firebaseFirestore, "feeds"));
                transaction.set(feedsRef, {
                    name: userData.name,
                    userName: userData.userName,
                    pfp: userData.pfp,
                    uid: userData.uid,
                    caption: caption,
                    img: ref,
                    createdAt: serverTimestamp()
                });
            });
            setCaption('');
            setImg(null);
            router.replace('home');
        } catch (error) {
            console.error("Transaction failed: ", error);
            alert("Failed to upload file and create document");
        }
    }
    const tabSize = 'w-8 h-7'
    return (
        <$View
            className='bg-dark items-center flex-1 pt-2'
        >
            <$View className='w-full flex-row justify-between lg:w-1/2 pl-3 pb-2 pr-3 '>
                <$View>
                    <$TouchableOpacity
                        onPress={() => { router.back() }}
                    >
                        <BackIcon height={33} width={33} />
                    </$TouchableOpacity>
                </$View>
                <$View className='flex-row gap-4'>
                    <KeyboardCloser />
                    <GetPhoto
                        img={img}
                        setImg={setImg}
                    />
                    <$TouchableOpacity
                        onPress={handleSubmit}
                    >
                        <SendIcon height={33} width={33} />
                    </$TouchableOpacity>
                </$View>
            </$View>
            <$View className='w-full h-full flex-row lg:w-1/2'>
                <$View className='w-1/6  pt-2 '>
                    <ShowPFP URL={userData?.pfp} size={'w-14 h-14'} />
                </$View>
                <$ScrollView
                    className='w-5/6 h-full pr-2 '
                    showsVerticalScrollIndicator={false}
                //contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <$Text className='text-white text-base pl-2'>{userData?.name}</$Text>
                    <$Text className='text-secondary-100 text-xs pl-2'>@{userData?.userName}</$Text>

                    <$TextInput
                        returnKeyType="default"
                        placeholder='Caption ....'
                        className=' rounded-lg  text-white p-2 placeholder-white w-full '
                        placeholderTextColor={'white'}
                        multiline
                        numberOfLines={Platform.OS === 'web' ? 20 : 1}
                        allowFontScaling
                        collapsable
                        style={[Platform.OS === 'web' ? { outlineStyle: 'none' } as TextStyle : { borderColor: '#000' }, { scrollbarWidth: 'none' } as TextStyle]}
                        value={caption}
                        onChangeText={(caption) => { setCaption(caption) }}
                    />
                    {img ?
                        <$View className='border-2 w-3/4 justify-center items-center rounded-2xl  border-white'>
                            <$Image
                                source={img ? { uri: img.url } : require('@/assets/images/profile.png')}
                                resizeMode='contain'
                                className='w-48 h-48'
                            />
                        </$View>
                        : null}
                </$ScrollView>
            </$View>
        </$View>
    )
}

export default create