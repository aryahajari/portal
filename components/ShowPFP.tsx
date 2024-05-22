import { firebaseStorage } from '@/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { $View } from './NativeWind';
import { Image } from 'expo-image';
import { styled } from 'nativewind'
const $Image = styled(Image)
const ShowPFP = (props: { URL: string | undefined, size: string }) => {
    const [PFPurl, setPFPurl] = useState<string | null>(null);
    if (props?.URL) {
        getDownloadURL(ref(firebaseStorage, props.URL))
            .then((url) => {
                setPFPurl(url);
            })
    }
    return (
        <$View className='items-center justify-center'>
            <$Image
                className={`lg:w-16 lg:h-16 rounded-full bg-primary-100 border-solid ${props.size}`}
                source={PFPurl ? { uri: PFPurl } : require('@/assets/images/profile.png')}
                contentFit='cover'
            />
        </$View>
    )
}

export default ShowPFP
