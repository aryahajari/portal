import { View, Text } from 'react-native'
import React from 'react'
import { $SafeAreaView } from '@/components/NativeWind'
import { Slot } from 'expo-router'

const _layout = () => {
    return (
        <$SafeAreaView className='bg-dark flex-1 p-0 m-0 border-0'>
            <Slot />
        </$SafeAreaView>
    )
}

export default _layout