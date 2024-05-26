import { View, Text, Platform } from 'react-native'
import React from 'react'
import { FeedSchema, UserSchema } from '@/context/schema'
import { $Link, $Text, $View } from '../NativeWind'
import ShowPFP from './ShowPFP'
import FeedImg from './FeedImg'
import FeedVideo from './feedVideo'
import Bookmark from './BookmarkBtn'
import Like from './Like'
const FeedLoader = ({ feed, visibleItems }: { feed: FeedSchema, visibleItems: string[] }) => {
    return (
        <>
            <$View className='w-full flex-row lg:w-1/2 self-center border-t-[1px] border-b-[1px] border-orange-50 pt-2 pb-2' key={feed.feedId}>
                <$View className=' p-1'>
                    <ShowPFP size={Platform.OS == 'web' ? 'h-16 w-16' : 'h-14 w-14'} URL={feed.pfp} />
                </$View>
                <$View className='w-5/6 pr-2'>
                    <$View className='flex-row justify-between  pl-1 mb-1' >
                        <$View>
                            <$Text className='text-white text-base'>{feed.name}</$Text>
                            <$Link href={{
                                pathname: "(userProfile)/[userName]",
                                params: { userName: feed.userName }
                            }}>
                                <$Text className='text-secondary-100 text-xs '>@{feed.userName}</$Text>
                            </$Link>
                        </$View>
                        <$Text className='text-white text-xs mt-1'>{feed.createdAt.toDate().toDateString().slice(3)}</$Text>
                    </$View>
                    <$Text className='text-white pl-1 mb-2 text-s'>{feed.caption ? feed.caption : null}</$Text>

                    {feed?.img && (feed.img.type === 'video' ?
                        <FeedVideo URL={feed.img.url} play={visibleItems.includes(feed.feedId)} aspectRatio={feed.img.aspectRatio} />
                        :
                        <FeedImg URL={feed.img.url} aspectRatio={feed.img.aspectRatio} />)
                    }
                    <$View className='flex-row justify-around'>
                        <Like feedId={feed.feedId} />
                        <Bookmark feedId={feed.feedId} />
                    </$View>
                    {/* {feed?.img && <FeedImg URL={feed.img.url} aspectRatio={feed.img.aspectRatio} />} */}
                </$View>
            </$View>
        </>
    )
}

export default FeedLoader