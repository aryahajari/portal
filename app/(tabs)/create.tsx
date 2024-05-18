import { styled } from 'nativewind'
import { Platform } from 'react-native'
import { icons } from '@/constants';
import React, { useState } from 'react'
import GetPhoto from '@/components/GetPhoto'
import ShowPFP from '@/components/ShowPFP';
import { useUserData } from '@/context/UserDataProvider';
import { useRouter } from 'expo-router'
import KeyboardCloser from '@/components/KeyboardCloser';
import { $Image, $ScrollView, $TextInput, $TouchableOpacity, $View } from '@/components/NativeWind';
//------------------------------------------------------------------------------------------------------------
import { ref, uploadBytes } from 'firebase/storage'
import { serverTimestamp, collection, doc, runTransaction } from 'firebase/firestore';
import { firebaseFirestore } from '@/FirebaseConfig';
import { firebaseStorage } from '@/FirebaseConfig';
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
        const storageRef = ref(firebaseStorage, `${userData?.uid}/${Date.now()}`);
        try {
            // Start a transaction
            await runTransaction(firebaseFirestore, async (transaction) => {
                let ref: null | string = null;
                if (img) {
                    const snapshot = await uploadBytes(storageRef, img.file, { customMetadata: { 'aspectRatio': img.aspectRatio.toString() } });
                    ref = snapshot.ref.fullPath;
                }
                // Create a new document in feeds collection
                const feedsRef = doc(collection(firebaseFirestore, "feeds"));
                transaction.set(feedsRef, {
                    caption: caption,
                    img: ref,
                    uid: userData?.uid,
                    createdAt: serverTimestamp()
                });
            });
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
                        <$Image
                            source={icons.leftArrow}
                            className={tabSize}
                        />
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
                        <$Image
                            source={icons.send}
                            className={tabSize}
                        />
                    </$TouchableOpacity>

                </$View>
            </$View>
            <$View className='w-full h-full flex-row lg:w-1/2'>
                <$View className='w-1/6  pt-2 '>
                    <ShowPFP URL={userData?.pfp} />
                </$View>
                <$ScrollView
                    className='w-5/6 h-full pr-2 '
                    showsVerticalScrollIndicator={false}
                //contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <$TextInput
                        returnKeyType="default"
                        placeholder='Caption ....'
                        className=' rounded-lg  text-white p-2 placeholder-white w-full pt-2'
                        placeholderTextColor={'white'}
                        multiline
                        numberOfLines={Platform.OS === 'web' ? 20 : 1}
                        showsVerticalScrollIndicator={false}
                        allowFontScaling
                        collapsable
                        style={[Platform.OS === 'web' ? { outlineStyle: 'none' } : { borderColor: '#000' }, { scrollbarWidth: 'none' }]}
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