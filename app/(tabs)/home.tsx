import React from 'react'
import { $Link, $SafeAreaView, $Text, $View } from '@/components/NativeWind';
const home = () => {
    return (

        <$SafeAreaView className='bg-dark flex-1 p-0 m-0 border-0'>

            <$View className='justify-center items-center' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <$Text>home</$Text>
                <$Link href={'/userInfo'}>
                    <$Text>userInfo</$Text>
                </$Link>
            </$View>
        </$SafeAreaView>

    )
}

export default home