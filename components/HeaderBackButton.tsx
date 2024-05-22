import React from 'react'
import { $Image, $TouchableOpacity, $View } from './NativeWind'
import { icons } from '@/constants'
import { router } from 'expo-router'

const HeaderBackButton = (props: { href: string }) => {
    return (
        <$View className='pl-2 w-full flex-row justify-between bg-dark border-b-[1px] border-stone-500 pb-1'>
            <$TouchableOpacity
                onPress={() => { props.href === 'back' ? router.back() : router.navigate(props.href) }}
            >
                <$Image
                    source={icons.leftArrow}
                    className='h-8 w-8'
                />
            </$TouchableOpacity>
            <$TouchableOpacity
                className='mr-2'
                onPress={() => { props.href === 'back' ? router.back() : router.navigate(props.href) }}
            >
                <$Image
                    source={icons.setting}
                    className='h-7 w-7'
                />
            </$TouchableOpacity>
        </$View>
    )
}

export default HeaderBackButton