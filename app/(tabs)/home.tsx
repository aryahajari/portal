import { $View, $FlatList } from '@/components/NativeWind'
import React, { useCallback, useEffect } from 'react'
import { getFollowingFeedData, updateUserLastFeedSeen } from '@/FirebaseConfig'
import { FeedSchema } from '@/context/schema'
import { useUserData } from '@/context/UserDataProvider';
import FeedLoader from '@/components/page/SingleFeed'
import { RefreshControl, ViewToken } from 'react-native';
const home = () => {
    const userData = useUserData();
    const following = userData?.following
    const uid = userData?.uid
    const lastFeedSeen = userData?.lastFeedSeen
    const [refreshing, setRefreshing] = React.useState(false);
    const [feeds, setFeeds] = React.useState<FeedSchema[]>([]);
    function refresh() {
        if (!(uid && following)) return
        setRefreshing(true);
        setFeeds([])
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
    //--------------------Viewability Config--------------------
    type prps = {
        viewableItems: ViewToken<unknown>[];
        changed: ViewToken<unknown>[];
    }
    const [viewableItems, setViewableItems] = React.useState<string[]>([])
    const [visibilityThreshold, setVisibilityThreshold] = React.useState(90);
    const onViewableItemsChanged = useCallback((props: prps) => {
        setViewableItems(props.changed.map((item) => item.key as string))
    }, [visibilityThreshold]);  // Dependency on visibilityThreshold
    return (
        <$View className='flex-1 bg-dark'>
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