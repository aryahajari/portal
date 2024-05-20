import React from 'react'
import { $Link, $SafeAreaView, $Text, $View } from '@/components/NativeWind';
const home = () => {
    return (

        <$SafeAreaView className='bg-dark flex-1 p-0 m-0 border-0'>

            <$View className='justify-center items-center' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <$Text className='text-white'>home</$Text>
                <$Link href={'/userInfo'}>
                    <$Text className='text-white'>userInfo</$Text>
                </$Link>
                <$Link
                    href={{
                        pathname: "/(userProfile)/[userName]",
                        params: { userName: 'AryaH' }
                    }}>
                    View user
                </$Link>
            </$View>
        </$SafeAreaView>

    )
}

export default home