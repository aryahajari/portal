import { View, Text, NativeSyntheticEvent, ImageLoadEventData } from 'react-native'
import React, { useEffect, useState } from 'react'
import { $Image, $View, $ImageBackground, $Text } from './NativeWind'
import { getImg } from '@/FirebaseConfig'
import { Image } from 'react-native'
const FeedImg = (props: { URL: string, aspectRatio: Number }) => {

    return (
        <>
            {props.URL &&
                <$View className='w-full flex-1' key={props.URL}>
                    <$Image
                        source={{ uri: props.URL }}
                        resizeMode='contain'
                        className='rounded-xl p-2'
                        style={{ width: '100%', height: '100%', aspectRatio: props.aspectRatio.toString() }}

                    />
                </$View>
            }
        </>
    )
}

export default FeedImg