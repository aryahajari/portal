import { View, Text, NativeSyntheticEvent, ImageLoadEventData } from 'react-native'
import React, { useEffect, useState } from 'react'
import { $View, $ImageBackground, $Text } from './NativeWind'
import { styled } from 'nativewind'
import { Image } from 'expo-image'
const $Image = styled(Image)
const FeedImg = (props: { URL: string, aspectRatio: Number }) => {

    return (
        <>
            {props.URL &&
                <$View className='w-full flex-1 p-1' key={props.URL}>
                    <$Image
                        source={{ uri: props.URL }}
                        contentFit='contain'
                        className='rounded-xl '
                        style={{ width: '100%', height: '100%', aspectRatio: props.aspectRatio.toString() }}

                    />
                </$View>
            }
        </>
    )
}

export default FeedImg