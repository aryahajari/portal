import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'
const $View = styled(View);
const $Text = styled(Text);
const $Image = styled(Image);
const $TouchableOpacity = styled(TouchableOpacity);
//---------------------------------------------------------------------------------------------------------
import { getDocumentAsync } from 'expo-document-picker';
import { firebaseFirestore, firebaseStorage } from '@/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUserData } from '@/context/UserDataProvider'
import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';

const SetProfilePicture = () => {
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
    const pickDocument = async () => {
        try {
            const result = await getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: false,
                multiple: false,
            });
            if (result !== null && result.assets && result.assets[0].file) {
                const storageRef = ref(firebaseStorage, 'profilePictures/' + userData + '/' + result.assets[0].name);
                await uploadBytes(storageRef, result.assets[0].file)
                    .then((snapshot) => {
                        updatePFP(snapshot.ref.fullPath);
                    })
                    .catch((error) => {
                        console.error("Error uploading file:", error);
                    });
            }
        } catch (error) {
            console.error('Document Picker Error:', error);
        }
    };
    return (
        <$View className='w-full items-center justify-center'>
            <$Image
                className='w-32 h-32 rounded-full mb-3 bg-primary-100 border-solid border-2 border-secondary-200'
                resizeMode='cover'
                source={PFPurl ? { uri: PFPurl } : require('@/assets/images/profile.png')}
            />
            <$TouchableOpacity
                onPress={pickDocument}
                className='bg-transparent text-white'
            >
                <$Text className='text-white'>Set Profile Picture</$Text>
            </$TouchableOpacity>

        </$View>
    )
}

export default SetProfilePicture
