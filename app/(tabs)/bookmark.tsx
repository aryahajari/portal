import { firebaseFirestore, getImg } from '@/FirebaseConfig';
import { $FlatList, $View } from '@/components/NativeWind';
import FeedLoader from '@/components/page/SingleFeed';
import { useUserData } from '@/context/UserDataProvider';
import { FeedDbSchema, FeedSchema } from '@/context/schema';
import { collection, doc, getDoc, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, RefreshControl, ViewToken } from 'react-native';

export default function bookmark() {
    const userData = useUserData();
    const [feeds, setFeeds] = useState<FeedSchema[] | null>(null);
    const [refreshing, setRefreshing] = React.useState(false);
    async function getBookmarks() {
        if (userData === null) return;
        const bookmarkDocRef = collection(firebaseFirestore, "users", userData.uid, 'bookmarks');
        const q = query(bookmarkDocRef,
            where("saved", "==", true),
            orderBy('savedAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const feedsList = querySnapshot.docs.map(doc => doc.id);
        const feeds = feedsList.map(async feedId => {
            const feedRef = doc(collection(firebaseFirestore, "feeds"), feedId);
            const docSnap = await getDoc(feedRef)
            const feed = docSnap.data() as FeedDbSchema;
            if (!feed.img) return { ...feed, feedId };
            const img = await getImg(feed.img);
            return { ...feed, img, feedId };
        });
        setFeeds(await Promise.all(feeds) as FeedSchema[]);
    }
    useEffect(() => {
        getBookmarks();
    }, []);
    //--------------------Viewability Config--------------------
    function refresh() {
        setRefreshing(true);
        getBookmarks().then(() => {
            setRefreshing(false);
        })
    }
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
        <$View
            className='flex-1 bg-dark'
            onLayout={() => { Platform.OS === 'web' && refresh() }}
        >
            {feeds && <$FlatList
                data={feeds}
                renderItem={({ item }) => <FeedLoader feed={item as FeedSchema} visibleItems={viewableItems} />}
                viewabilityConfig={{ itemVisiblePercentThreshold: visibilityThreshold }}
                keyExtractor={(item) => (item as FeedSchema).feedId}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
                onViewableItemsChanged={onViewableItemsChanged}
            />}
        </$View>
    );

}
