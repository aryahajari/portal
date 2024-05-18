import { View, Text, NativeSyntheticEvent, ImageLoadEventData } from 'react-native'
import React, { useState } from 'react'
import { $Image, $View, $ImageBackground, $Text } from './NativeWind'
import { getDownloadUrl } from '@/FirebaseConfig'

const FeedImg = (props: { URL: string }) => {
    const [img, setImg] = useState<string | null>(null)
    if (props?.URL) {
        getDownloadUrl(props.URL)
            .then((url) => {
                setImg(url);
            })
    }
    return (
        <>
            {img &&
                <$View className='w-full flex-1 justify-center items-center'>
                    <$Image
                        source={{ uri: img }}
                        resizeMode='contain'
                        className='w-full h-full'


                    />
                </$View>
            }
        </>
    )
}

export default FeedImg