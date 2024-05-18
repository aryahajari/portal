import { $View, $Text, $ScrollView, $TextInput, $Image } from '@/components/NativeWind'
import React from 'react'
import SignOutBtn from '@/components/SignOutBtn'
import { useUserData } from '@/context/UserDataProvider'
import { getUserFeedData, getDownloadUrl } from '@/FirebaseConfig'
import ShowPFP from '@/components/ShowPFP'
import { FeedSchema } from '@/context/schema'
import { Platform } from 'react-native'
import FeedImg from '@/components/FeedImg'
import TestComponent from '@/components/TestComponent'
const tab2 = () => {
    const userData = useUserData()
    if (!userData) return null
    const [feed, setFeed] = React.useState<FeedSchema[] | null>(null)
    getUserFeedData(userData.uid).then((data) => {
        setFeed(data)
    })

    return (
        <$View className='flex-1 bg-dark items-center'>
            <$ScrollView className='w-full'>
                {feed !== null && userData !== null && feed.map((item, index) => (
                    <$View className='w-full flex-row lg:w-1/2' key={item.feedId}>
                        <$View className='w-1/6  pt-2 '>
                            <ShowPFP URL={userData.pfp} />
                        </$View>
                        <$View className='w-5/6 pr-2'>
                            {item.caption && <$Text className='text-white p-2'>{item.caption}</$Text>}
                            {item.img &&
                                <>
                                    <FeedImg URL={item.img} />
                                    {/* <TestComponent /> */}
                                </>
                            }
                        </$View>
                    </$View>

                ))}
            </$ScrollView>
        </$View>
    );

}

export default tab2