import React from 'react'
import { $TouchableOpacity, $View } from './NativeWind'
import { router } from 'expo-router'
import { BackIcon } from '@/constants/SVG'

const HeaderBackButton = () => {
    return (
        <$View className='w-full flex-row justify-between mb-0 pb-0 pl-3  pr-3 lg:w-1/2 lg:mr-auto lg:ml-auto'>
            <$View>
                <$TouchableOpacity
                    onPress={() => { router.back() }}
                >
                    <BackIcon height={25} width={25} />
                </$TouchableOpacity>
            </$View>
        </$View>
    )
}

export default HeaderBackButton