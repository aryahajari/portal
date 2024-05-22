
import { Platform } from 'react-native'
import { icons } from '@/constants';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const copyDocumentToLocalUri = async (contentUri: string) => {
    try {
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
//---------------------------------------------------------------------------------------------------------
import { getDocumentAsync } from 'expo-document-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { $Image, $TouchableOpacity } from './NativeWind';
interface imgSchema {
    file: Blob
    url: string
    aspectRatio: number
}
const getAspectRatio = async (uri: string) => {
    const { width, height } = await ImageManipulator.manipulateAsync(uri, []);
    return width / height;
};
const GetPhoto = (props: { img: imgSchema | null, setImg: React.Dispatch<React.SetStateAction<imgSchema | null>> }) => {

    const pickImgPhone = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!(result.assets && result.assets[0].uri)) return;
        const aspectRatio = result.assets[0].width / result.assets[0].height;
        const uri = result.assets[0].uri;
        const blob = await uriToBlob(uri)
        props.setImg({ file: blob, url: uri, aspectRatio });
    };
    const pickImgWeb = async () => {
        try {
            const result = await getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: false,
                multiple: false,
            });
            if (!(result !== null && result.assets && result.assets[0].file)) { throw new Error('No file found') }
            const blob = new Blob([result.assets[0].file], { type: result.assets[0].file.type });
            const uri = result.assets[0].uri;
            const aspectRatio = await getAspectRatio(uri);
            props.setImg({ file: blob, url: uri, aspectRatio });

        } catch (error) {
            console.error('Document Picker Error:', error);
        }
    };
    return (
        <$TouchableOpacity
            onPress={Platform.OS === 'web' ? pickImgWeb : pickImgPhone}
            className='bg-transparent text-white justify-end items-end self-end'
        >
            <$Image
                source={icons.picture}
                className={'w-8 h-7'}
            />
        </$TouchableOpacity>
    )
}

export default GetPhoto
