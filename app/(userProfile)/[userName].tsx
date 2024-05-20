import { useGlobalSearchParams } from 'expo-router';
import { $View, $ScrollView } from '@/components/NativeWind'
import React, { useEffect } from 'react'
import { getUserFeedData, getUserProfileData, getUidFromUserName } from '@/FirebaseConfig'
import { FeedSchema, UserSchema } from '@/context/schema'
import ProfileInfo from '@/components/userPage/ProfileInfo'
import FeedLoader from '@/components/userPage/FeedLoader'
const userProfile = () => {
    const [feed, setFeed] = React.useState<FeedSchema[] | null>(null)
    const [uid, setUid] = React.useState<string | null>(null)
    const [userData, setUserData] = React.useState<UserSchema | null>(null)
    const { userName } = useGlobalSearchParams()
    useEffect(() => {
        if (!userName) return;

        const fetchUID = async () => {
            const data = await getUidFromUserName(userName.toString());
            console.log('data', data);
            setUid(data);
        };

        fetchUID();
    }, [userName]);

    useEffect(() => {
        console.log('uid', uid);
        if (!uid) return;

        const fetchData = async () => {
            const feedData = await getUserFeedData(uid);
            const userProfileData = await getUserProfileData(uid);

            setFeed(feedData);
            setUserData(userProfileData);
        };

        fetchData();
    }, [uid]);

    if (!userData) return null

    return (
        <$View className='flex-1 bg-dark'>
            <$ScrollView className='w-full self-center' showsVerticalScrollIndicator={false}>
                <ProfileInfo userData={userData} />
                <FeedLoader feed={feed} userData={userData} />
            </$ScrollView>
        </$View>
    );

}

export default userProfile