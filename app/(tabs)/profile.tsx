import { $View, $Text, $ScrollView, $TextInput, $Image, $TouchableOpacity } from '@/components/NativeWind'
import React from 'react'
import SignOutBtn from '@/components/SignOutBtn'
import { useUserData } from '@/context/UserDataProvider'
import { getUserFeedData } from '@/FirebaseConfig'
import ShowPFP from '@/components/ShowPFP'
import { FeedSchema } from '@/context/schema'
import { Platform } from 'react-native'
import FeedImg from '@/components/FeedImg'
import TestComponent from '@/components/TestComponent'
import { icons } from '@/constants'
import { useRouter } from 'expo-router'
const tab2 = () => {
    const router = useRouter()
    const userData = useUserData()
    if (!userData) return null
    const [feed, setFeed] = React.useState<FeedSchema[] | null>(null)
    getUserFeedData(userData.uid).then((data) => {
        //console.log(data[0].img?.url, data[0].img?.aspectRatio)
        //console.log(data)
        setFeed(data)
    })
    const TOPBARSIZE = 'h-7 w-7'
    return (
        <$View className='flex-1 bg-dark'>
            <$ScrollView className='w-full self-center' showsVerticalScrollIndicator={false}>
                <$View className='flex-row justify-between p-1'>
                    <$View className='items-center'>
                        <$Text className='text-white text-lg'>{userData.userName}</$Text>
                    </$View>
                    <$View className='flex-row gap-2'>
                        <$TouchableOpacity
                            onPress={() => { }}
                        >
                            <$Image
                                source={icons.search}
                                className={TOPBARSIZE}
                            />
                        </$TouchableOpacity>
                        <$TouchableOpacity
                            onPress={() => { router.push('userInfo') }}
                        >
                            <$Image
                                source={icons.setting}
                                className={TOPBARSIZE}
                            />
                        </$TouchableOpacity>
                    </$View>
                </$View>
                <$View className='flex-row items-center p-2'>
                    <$View className='m-0'>
                        <ShowPFP URL={userData.pfp} />
                    </$View>
                    <$View className='flex-row gap-3 self-center ml-auto mr-auto'>
                        <$View className='justify-center items-center'>
                            <$Text className='text-white'> 0</$Text>
                            <$Text className='text-white'>posts</$Text>
                        </$View>
                        <$View className='justify-center items-center'>
                            <$Text className='text-white'> 0</$Text>
                            <$Text className='text-white'>follower</$Text>
                        </$View>
                        <$View className='justify-center items-center'>
                            <$Text className='text-white'> 0</$Text>
                            <$Text className='text-white'>following</$Text>
                        </$View>
                    </$View>
                </$View>
                {feed !== null && userData !== null && feed.map((item, index) => (
                    <$View className='w-full flex-row lg:w-1/2 self-center border-t-[1px] border-b-[1px] border-orange-50 pt-2 pb-2' key={item.feedId}>
                        <$View className='w-1/6  pt-1 '>
                            <ShowPFP URL={userData.pfp} />
                        </$View>
                        <$View className='w-5/6 pr-2'>
                            <$View className='flex-row justify-between items-center pl-1 mb-1' >
                                <$Text className='text-secondary-100 text-base'>{userData.userName}</$Text>
                                <$Text className='text-white text-xs'>{item.createdAt.toDate().toDateString().slice(3)}</$Text>
                            </$View>
                            {item.caption && <$Text className='text-white pl-1 mb-2 text-sm'>{item.caption}</$Text>}
                            {item.img &&
                                <>
                                    <FeedImg URL={item.img.url} aspectRatio={item.img.aspectRatio} />
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