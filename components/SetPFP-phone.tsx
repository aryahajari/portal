import React, { useEffect, useState } from 'react'
import { firebaseStorage, firebaseFirestore } from '@/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useUserData } from '@/context/UserDataProvider'
import { $Image, $Text, $TouchableOpacity, $View } from './NativeWind';
const copyDocumentToLocalUri = async (contentUri: string) => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(contentUri);
        if (!FileSystem.documentDirectory) {
            throw new Error('Error getting documnet info');
        }
        const localUri = FileSystem.documentDirectory + getFileName(contentUri);
        await FileSystem.copyAsync({
            from: contentUri,
            to: localUri
        });
        return localUri;
    } catch (error) {
        console.error('Failed to copy file from content URI:', error);
        throw error;
    }
};
function getFileName(url: string) {
    const parts = url.split('/');
    return parts[parts.length - 1];
}
const uriToBlob = async (uri: string) => {
    const localUri = await copyDocumentToLocalUri(uri);
    const response = await fetch(localUri);
    return await response.blob();
};


const setPFP = () => {
    const [PFPurl, setPFPurl] = useState<string | null>(null);
    const userData = useUserData();
    useEffect(() => {
        if (userData !== null) {
            getDownloadURL(ref(firebaseStorage, userData.pfp))
                .then((url) => {
                    setPFPurl(url);
                })
        }
    }, [userData]);
    function updatePFP(link: string) {
        if (userData === null) return;
        const userDbRef = doc(firebaseFirestore, 'users', userData?.uid)
        setDoc(userDbRef, { pfp: link }, { merge: true })
            .catch((error) => { console.log("Error updating document: ", error); });
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!(result.assets && result.assets[0].uri)) return;
        const File = await uriToBlob(result.assets[0].uri);
        const storageRef = ref(firebaseStorage, 'profilePictures/' + userData?.uid + '/' + getFileName(result.assets[0].uri));
        uploadBytes(storageRef, File)
            .then((snapshot) => {
                updatePFP(snapshot.ref.fullPath);
                console.log('Uploaded a blob or file!');
            })
            .catch((error) => {
                console.error("Error uploading file:");
            });

    };
    return (
        <$View className='w-full items-center justify-center'>
            <$Image
                className='w-32 h-32 rounded-full mb-3 bg-primary-100 border-solid border-2 border-secondary-200'
                resizeMode='cover'
                source={PFPurl ? { uri: PFPurl } : require('@/assets/images/profile.png')}
            />
            <$TouchableOpacity
                onPress={pickImage}
                className='bg-transparent text-white'
            >
                <$Text className='text-white'>Set Profile Picture</$Text>
            </$TouchableOpacity>

        </$View>
    )
}

export default setPFP
