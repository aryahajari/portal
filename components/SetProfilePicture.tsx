import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'
const $View = styled(View);
const $Text = styled(Text);
const $Image = styled(Image);
const $TouchableOpacity = styled(TouchableOpacity);
//---------------------------------------------------------------------------------------------------------
import { getDocumentAsync } from 'expo-document-picker';
import { firebaseStorage } from '@/FirebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';
import { useUserData } from '@/context/UserDataProvider'

const SetProfilePicture = () => {
    const userData = useUserData();

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
                        console.log('Uploaded a blob or file!', snapshot);
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
                source={require('@/assets/images/profile.png')}
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