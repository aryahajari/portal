import { firebaseStorage } from '@/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { $Image, $View } from './NativeWind';

const ShowPFP = (props: { URL: string | undefined }) => {
    const [PFPurl, setPFPurl] = useState<string | null>(null);
    if (props?.URL) {
        getDownloadURL(ref(firebaseStorage, props.URL))
            .then((url) => {
                setPFPurl(url);
            })
    }
    return (
        <$View className='items-center justify-center w-full'>
            <$Image
                className='h-14 w-14 lg:w-16 lg:h-16 rounded-full bg-primary-100 border-solid border-2 border-secondary-200'
                resizeMode='cover'
                source={PFPurl ? { uri: PFPurl } : require('@/assets/images/profile.png')}
            />
        </$View>
    )
}

export default ShowPFP
