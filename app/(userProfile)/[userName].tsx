import { useGlobalSearchParams } from 'expo-router';
import { $View, $ScrollView } from '@/components/NativeWind'
import React, { useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { getUserFeedData, getUserProfileData, getUidFromUserName } from '@/FirebaseConfig'
import { FeedSchema, UserSchema } from '@/context/schema'
import ProfileInfo from '@/components/userPage/ProfileInfo'
import FeedLoader from '@/components/userPage/FeedLoader'
import HeaderBackButton from '@/components/HeaderBackButton'
const userProfile = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [feed, setFeed] = React.useState<FeedSchema[] | null>(null)
    const [uid, setUid] = React.useState<string | null>(null)
    const [userData, setUserData] = React.useState<UserSchema | null>(null)
    const { userName } = useGlobalSearchParams()
    function refresh() {
        setRefreshing(true);
        if (!uid) return;
        fetchUserFeedData(uid).then(() => { setRefreshing(false); })
    }
    const fetchUID = async (uid: string) => {
        const data = await getUidFromUserName(uid);
        setUid(data);
    };
    const fetchUserFeedData = async (uid: string) => {
        const feedData = await getUserFeedData(uid);
        const userProfileData = await getUserProfileData(uid);
        setFeed(feedData);
        setUserData(userProfileData);
    };
    useEffect(() => {
        if (!userName) return;
        fetchUID(userName.toString());
    }, [userName]);

    useEffect(() => {
        console.log('uid', uid);
        if (!uid) return;
        fetchUserFeedData(uid);
    }, [uid]);

    if (!userData) return null

    return (
        <$View className='flex-1 bg-dark'>

            <$View className='w-full lg:w-1/2 lg:mr-auto lg:ml-auto'>
                <HeaderBackButton href='search' />
            </$View>
            <$ScrollView className='w-full self-center'
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            >

                <ProfileInfo
                    userData={userData}
                    feed={feed?.length || 0}
                />
                <FeedLoader feed={feed} userData={userData} />
            </$ScrollView>
        </$View>
    );

}

export default userProfile