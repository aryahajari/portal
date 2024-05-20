import { router, useGlobalSearchParams } from 'expo-router';
import { $View, $ScrollView, $TouchableOpacity, $Text, $Image } from '@/components/NativeWind'
import React, { useEffect } from 'react'
import { getUserFeedData, getUserProfileData, getUidFromUserName } from '@/FirebaseConfig'
import { FeedSchema, UserSchema } from '@/context/schema'
import { useUserData } from '@/context/UserDataProvider';
import ProfileInfo from '@/components/userPage/ProfileInfo'
import FeedLoader from '@/components/userPage/FeedLoader'
import { icons } from '@/constants';
const profile = () => {
    const [feed, setFeed] = React.useState<FeedSchema[] | null>(null)
    const userData = useUserData();
    if (!userData) return null
    const fetchFeedData = async () => {
        const feedData = await getUserFeedData(userData.uid);
        setFeed(feedData);
    };
    fetchFeedData();
    const TOPBARSIZE = 'h-6 w-6'
    return (
        <$View className='flex-1 bg-dark'>
            <$View className='w-full lg:w-1/2 lg:mr-auto lg:ml-auto'>

                <$View className='flex-row  p-1 mr-2 ml-2 justify-between'>
                    <$View className='items-center'>
                        <$Text className='text-white text-lg'>{userData.userName}</$Text>
                    </$View>
                    <$View className='flex-row gap-x-4'>
                        <$TouchableOpacity
                            onPress={() => { }}
                        >
                            <$Image
                                source={icons.search}
                                className={TOPBARSIZE}
                            />
                        </$TouchableOpacity>
                        <$TouchableOpacity
                            onPress={() => { router.navigate('userInfo') }}
                        >
                            <$Image
                                source={icons.setting}
                                className={TOPBARSIZE}
                            />
                        </$TouchableOpacity>
                    </$View>
                </$View>
            </$View>
            <$ScrollView className='w-full self-center' showsVerticalScrollIndicator={false}>
                <ProfileInfo userData={userData} />
                <FeedLoader feed={feed} userData={userData} />
            </$ScrollView>
        </$View>
    );

}

export default profile