import { Link, router } from 'expo-router';
import { $View, $ScrollView, $TouchableOpacity, $Text, $Image, $Link } from '@/components/NativeWind'
import React, { useEffect } from 'react'
import { getFollowingFeedData, getUserFeedData, getUserProfileData, updateUserLastFeedSeen } from '@/FirebaseConfig'
import { FeedSchema, UserSchema } from '@/context/schema'
import { useUserData } from '@/context/UserDataProvider';
import ProfileInfo from '@/components/userPage/ProfileInfo'
import FeedLoader from '@/components/userPage/FeedLoader'
import { icons } from '@/constants';
import { RefreshControl } from 'react-native';
const home = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [feeds, setFeeds] = React.useState<FeedSchema[]>([]);
    const userData = useUserData();
    if (!userData) return null
    const following = userData.following
    const uid = userData.uid
    const lastFeedSeen = userData.lastFeedSeen
    function refresh() {
        setRefreshing(true);
        updateUserLastFeedSeen(uid).then(() => {
            getFollowingFeedData(following, lastFeedSeen)
                .then((data) => {
                    setFeeds(data)
                    setRefreshing(false);
                })
        })
    }
    useEffect(() => {
        getFollowingFeedData(following, lastFeedSeen)
            .then((data) => {
                setFeeds(data)
                setRefreshing(false);
            })
    }, [])
    const TOPBARSIZE = 'h-6 w-6'
    return (
        <$View className='flex-1 bg-dark'>
            <$ScrollView className='w-full self-center'
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            >
                <FeedLoader feeds={feeds} />
            </$ScrollView>
        </$View>
    );

}

export default home