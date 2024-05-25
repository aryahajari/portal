import { $View, $Text, $Image, $Link, $FlatList } from '@/components/NativeWind'
import React, { useCallback, useEffect } from 'react'
import { getUserFeedData, getUserProfileData } from '@/FirebaseConfig'
import { FeedSchema, UserSchema } from '@/context/schema'
import { useUserData } from '@/context/UserDataProvider';
import ProfileInfo from '@/components/page/ProfileInfo'
import FeedLoader from '@/components/page/SingleFeed'
import { icons } from '@/constants';
import { RefreshControl, ViewToken } from 'react-native';
const TOPBARSIZE = 'h-6 w-6'
const Header = ({ userName }: { userName: string }) => {
    return (
        <$View className='w-full lg:w-1/2 lg:mr-auto lg:ml-auto'>
            <$View className='flex-row pr-1 pl-3 justify-between items-center'>
                <$View className='items-center'>
                    <$Text className='text-white text-xl'>{userName}</$Text>
                </$View>
                <$View className='flex-row items-center'>
                    <$Link
                        className='h-10 mt-2 mr-2'
                        href={'/(auth)/userInfo'}>
                        <$Image
                            resizeMode='contain'
                            source={icons.setting}
                            className={TOPBARSIZE + ''}
                        />
                    </$Link>

                </$View>
            </$View>
        </$View>
    )
}
const profile = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    function refresh() {
        setRefreshing(true);
        setFeeds([])
        if (!self) return;
        fetchUserFeedData(self.uid).then(() => { setRefreshing(false); })
    }
    const [feeds, setFeeds] = React.useState<FeedSchema[] | null>(null)
    const self = useUserData();
    const fetchUserFeedData = async (uid: string) => {
        if (!uid) return
        const feedData = await getUserFeedData(uid);
        setFeeds(feedData);
    };

    useEffect(() => {
        if (!self) return;
        fetchUserFeedData(self.uid);
    }, [self]);
    //--------------------Viewability Config--------------------
    type dsd = {
        viewableItems: ViewToken<unknown>[];
        changed: ViewToken<unknown>[];
    }
    const [viewableItems, setViewableItems] = React.useState<string[]>([])
    const [visibilityThreshold, setVisibilityThreshold] = React.useState(90);
    const onViewableItemsChanged = useCallback((props: dsd) => {
        setViewableItems(props.changed.map((item) => item.key as string))
    }, [visibilityThreshold]);  // Dependency on visibilityThreshold
    return (
        <$View className='flex-1 bg-dark'>
            <$FlatList
                ListHeaderComponent={
                    <>
                        <Header userName={self?.userName ?? ''} />
                        <ProfileInfo
                            userData={self ?? {} as UserSchema}
                            feed={feeds?.length || 0}
                        />
                    </>}
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
export default profile