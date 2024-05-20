import React from 'react'
import { $Image, $TouchableOpacity, $View } from './NativeWind'
import { icons } from '@/constants'
import { router } from 'expo-router'

const HeaderBackButton = (props: { href: string }) => {
    return (
        <$View className='pl-2 bg-dark'>
            <$TouchableOpacity
                onPress={() => { router.navigate(props.href) }}
            >
                <$Image
                    source={icons.leftArrow}
                    className='h-8 w-8'
                />
            </$TouchableOpacity>
        </$View>
    )
}

export default HeaderBackButton