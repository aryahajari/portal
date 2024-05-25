import { useGlobalSearchParams } from 'expo-router';
import { $View, $FlatList } from '@/components/NativeWind'
import React, { useCallback, useEffect } from 'react'
import { RefreshControl, ViewToken } from 'react-native'
import { getUserFeedData, getUserProfileData, getUidFromUserName } from '@/FirebaseConfig'
import { FeedSchema, UserSchema } from '@/context/schema'
import ProfileInfo from '@/components/page/ProfileInfo'
import FeedLoader from '@/components/page/SingleFeed'
const userProfile = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [feeds, setFeeds] = React.useState<FeedSchema[] | null>(null)
    const [uid, setUid] = React.useState<string | null>(null)
    const [userData, setUserData] = React.useState<UserSchema | null>(null)
    const { userName } = useGlobalSearchParams()
    function refresh() {
        setRefreshing(true);
        setFeeds([])
        if (!uid) return;
        fetchUserPostData(uid).then(() => { setRefreshing(false); })
    }
    const fetchUID = async (uid: string) => {
        const data = await getUidFromUserName(uid);
        setUid(data);
    };
    const fetchUserPostData = async (uid: string) => {
        const feedData = await getUserFeedData(uid);
        const userProfileData = await getUserProfileData(uid);
        setFeeds(feedData);
        setUserData(userProfileData);
    };
    useEffect(() => {
        if (!userName) return;
        fetchUID(userName.toString());
    }, [userName]);

    useEffect(() => {
        if (!uid) return;
        fetchUserPostData(uid);
    }, [uid]);
    //--------------------Viewability Config--------------------
    type prps = {
        viewableItems: ViewToken<unknown>[];
        changed: ViewToken<unknown>[];
    }
    const [viewableItems, setViewableItems] = React.useState<string[]>([])
    const [visibilityThreshold, setVisibilityThreshold] = React.useState(90);
    const onViewableItemsChanged = useCallback((props: prps) => {
        setViewableItems(props.changed.map((item) => item.key as string))
    }, [visibilityThreshold]);
    return (
        <$View className='flex-1 bg-dark'>
            <$FlatList
                ListHeaderComponent={<ProfileInfo
                    userData={userData}
                    feed={feeds?.length || 0}
                />}
                data={feeds}
                renderItem={({ item }) => <FeedLoader feed={item as FeedSchema} visibleItems={viewableItems} />}
                viewabilityConfig={{ itemVisiblePercentThreshold: visibilityThreshold }}
                keyExtractor={(item) => (item as FeedSchema).feedId}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
                onViewableItemsChanged={onViewableItemsChanged}

            />
        </$View>
    )
}

export default userProfile