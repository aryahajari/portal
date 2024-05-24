import { Link, router } from 'expo-router';
import { $View, $ScrollView, $TouchableOpacity, $Text, $Image, $Link, $FlatList } from '@/components/NativeWind'
import React, { useCallback, useEffect } from 'react'
import { getFollowingFeedData, getUserFeedData, getUserProfileData, updateUserLastFeedSeen } from '@/FirebaseConfig'
import { FeedSchema, UserSchema } from '@/context/schema'
import { useUserData } from '@/context/UserDataProvider';
import ProfileInfo from '@/components/userPage/ProfileInfo'
import FeedLoader from '@/components/userPage/SingleFeed'
//import FeedLoader from '@/components/userPage/FeedLoader'

import { icons } from '@/constants';
import { FlatList, RefreshControl, ViewToken } from 'react-native';
const home = () => {
    const userData = useUserData();
    // if (!userData) return null
    const following = userData?.following
    const uid = userData?.uid
    const lastFeedSeen = userData?.lastFeedSeen
    const [refreshing, setRefreshing] = React.useState(false);
    const [feeds, setFeeds] = React.useState<FeedSchema[]>([]);
    function refresh() {
        if (!(uid && following)) return
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
        if (!(following)) return
        getFollowingFeedData(following, lastFeedSeen)
            .then((data) => {
                setRefreshing(false);
                setFeeds(data)
            })
    }, [userData])
    type dsd = {
        viewableItems: ViewToken<unknown>[];
        changed: ViewToken<unknown>[];
    }
    const [viewableItems, setViewableItems] = React.useState<string[]>([])
    const [visibilityThreshold, setVisibilityThreshold] = React.useState(90);

    // const onViewableItemsChanged = (props: dsd) => {
    //        setViewableItems(props.changed.map((item) => item.key as string))
    // };
    const onViewableItemsChanged = useCallback((props: dsd) => {
        setViewableItems(props.changed.map((item) => item.key as string))
    }, [visibilityThreshold]);  // Dependency on visibilityThreshold
    const TOPBARSIZE = 'h-6 w-6'
    return (
        <$View className='flex-1 bg-dark'>
            {/* <$ScrollView className='w-full self-center'
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            >
                <FeedLoader feeds={feeds} />
            </$ScrollView> */}
            <$FlatList
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
    );

}

export default home