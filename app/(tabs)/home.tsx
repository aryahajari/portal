import { $View, $FlatList } from '@/components/NativeWind'
import React, { useCallback, useEffect } from 'react'
import { firebaseFirestore, getFollowingFeedData, getImg, updateUserLastFeedSeen } from '@/FirebaseConfig'
import { FeedSchema, FeedDbSchema } from '@/context/schema'
import { useUserData } from '@/context/UserDataProvider';
import FeedLoader from '@/components/page/SingleFeed'
import { ActivityIndicator, RefreshControl, ViewToken } from 'react-native';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';

const home = () => {
    const userData = useUserData();
    const following = userData?.following
    const uid = userData?.uid
    const lastFeedSeen = userData?.lastFeedSeen
    const [refreshing, setRefreshing] = React.useState(false);
    const [feeds, setFeeds] = React.useState<(FeedDbSchema | FeedSchema)[]>([]);
    const [lastFeed, setLastFeed] = React.useState<FeedDbSchema | undefined>(undefined);
    const [isLastBatch, setIsLastBatch] = React.useState(false);
    useEffect(() => {
        if (!(following)) return
        getFollowingFeedData(following, lastFeedSeen)
            .then((data) => {
                if (!data) return
                setRefreshing(false);
                setLastFeed(data.lastFeed)
                setFeeds(data.feeds)
                setIsLastBatch(data.isLastBatch)
            })
    }, [userData])
    // useEffect(() => {
    //     console.log(feeds.map((feed, index) => index + '\t' + feed.caption.slice(0, 10) + '\t' + feed.img + '\t' + feed.feedId + "\n"))
    // }, [feeds])
    function refresh() {
        if (!(uid && following)) return
        setRefreshing(true);
        //setFeeds([])
        updateUserLastFeedSeen(uid).then(() => {
            getFollowingFeedData(following, undefined)
                .then((data) => {
                    if (!data) return
                    setLastFeed(data.lastFeed)
                    setFeeds(data.feeds)
                    setIsLastBatch(data.isLastBatch)
                    setRefreshing(false);
                }).catch((error) => {
                    console.error('Error in fetching feeds', error);
                    setRefreshing(false);
                })
        })
    }
    const fetchmore = async () => {
        const RETREAVAL_LIMIT = 5;
        if (!lastFeed) return
        try {
            const q = query(
                collection(firebaseFirestore, "feeds"),
                where("uid", "in", following),
                where("createdAt", "<", lastFeed.createdAt),
                orderBy('createdAt', 'desc'),
                startAfter(lastFeed.createdAt),
                limit(RETREAVAL_LIMIT),
            );
            const querySnapshot = await getDocs(q);
            const newFeeds = querySnapshot.docs.map(doc => ({ ...doc.data(), feedId: doc.id }) as FeedDbSchema);
            setLastFeed(newFeeds[newFeeds.length - 1]);
            const enhancedFeeds = newFeeds.map(async feed => {
                if (!feed.img) return feed;
                try {
                    const img = await getImg(feed.img);
                    return { ...feed, img } as FeedSchema;
                } catch (e) {
                    return { ...feed, img: undefined } as FeedDbSchema;
                }
            });
            const resolvedNewFeeds = await Promise.all(enhancedFeeds);
            setIsLastBatch(newFeeds.length < RETREAVAL_LIMIT);
            setFeeds([...feeds, ...resolvedNewFeeds]);
        } catch (error) {
            throw new Error('Unable to fetch feed data');
        }
    }
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
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                        tintColor="#FFF" // iOS
                    />
                }
                ListFooterComponent={footer}
                ListFooterComponentStyle={{ display: isLastBatch || !userData?.following ? 'none' : 'flex' }}
                onViewableItemsChanged={onViewableItemsChanged}
                onEndReached={fetchmore}
            //onEndReachedThreshold={0.5}

            />
        </$View>
    );

}
const footer = () => {
    return (
        <$View className='flex-1 pt-5 mt-2  justify-center items-center'>
            <ActivityIndicator size="large" color={'#FFF'} />
        </$View>
    )
}
export default home