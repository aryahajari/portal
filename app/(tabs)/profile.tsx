import { Link, router } from 'expo-router';
import { $View, $ScrollView, $TouchableOpacity, $Text, $Image, $Link } from '@/components/NativeWind'
import React, { useEffect } from 'react'
import { getUserFeedData, getUserProfileData } from '@/FirebaseConfig'
import { FeedSchema, UserSchema } from '@/context/schema'
import { useUserData } from '@/context/UserDataProvider';
import ProfileInfo from '@/components/userPage/ProfileInfo'
import FeedLoader from '@/components/userPage/FeedLoader'
import { icons } from '@/constants';
import { RefreshControl } from 'react-native';
const profile = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    function refresh() {
        setRefreshing(true);
        if (!self) return;
        fetchUserFeedData(self.uid).then(() => { setRefreshing(false); })
    }
    const [feeds, setFeeds] = React.useState<FeedSchema[] | null>(null)
    const [userData, setUserData] = React.useState<UserSchema | null>(null)
    const self = useUserData();
    if (!self) return null
    const fetchUserFeedData = async (uid: string) => {
        const feedData = await getUserFeedData(uid);
        const userProfileData = await getUserProfileData(uid);
        setFeeds(feedData);
        setUserData(userProfileData);
    };

    useEffect(() => {
        if (!self) return;
        fetchUserFeedData(self.uid);
    }, [self]);


    if (!userData) return null
    const TOPBARSIZE = 'h-6 w-6'
    return (
        <$View className='flex-1 bg-dark'>
            <$View className='w-full lg:w-1/2 lg:mr-auto lg:ml-auto'>

                <$View className='flex-row  p-1 mr-2 ml-2 justify-between items-center'>
                    <$View className='items-center'>
                        <$Text className='text-white text-lg'>{userData.userName}</$Text>
                    </$View>
                    <$View className='flex-row gap-x-4'>
                        <$Link href={'/(auth)/userInfo'}>
                            <$Image
                                source={icons.setting}
                                className={TOPBARSIZE}
                            />
                        </$Link>

                    </$View>
                </$View>
            </$View>
            <$ScrollView className='w-full self-center'
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            >
                <ProfileInfo feed={feeds ? feeds.length : 0} userData={userData} />
                {feeds && <FeedLoader feeds={feeds} />}
            </$ScrollView>
        </$View>
    );

}

export default profile