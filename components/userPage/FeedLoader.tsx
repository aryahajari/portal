import { View, Text, Platform } from 'react-native'
import React from 'react'
import { FeedSchema, UserSchema } from '@/context/schema'
import { $Text, $View } from '../NativeWind'
import ShowPFP from '../ShowPFP'
import FeedImg from '../FeedImg'
// import FeedVideo from '../FeedVideo'
const FeedLoader = ({ feeds }: { feeds: FeedSchema[] }) => {
    return (
        <>
            {feeds !== null && feeds.map((item, index) => (
                <$View className='w-full flex-row lg:w-1/2 self-center border-t-[1px] border-b-[1px] border-orange-50 pt-2 pb-2' key={item.feedId}>
                    <$View className=' p-1'>
                        <ShowPFP size={Platform.OS == 'web' ? 'h-16 w-16' : 'h-14 w-14'} URL={item.pfp} />
                    </$View>
                    <$View className='w-5/6 pr-2'>
                        <$View className='flex-row justify-between  pl-1 mb-1' >
                            <$View>
                                <$Text className='text-white text-sm'>{item.name}</$Text>
                                <$Text className='text-secondary-100 text-xs '>@{item.userName}</$Text>
                            </$View>
                            <$Text className='text-white text-xs mt-1'>{item.createdAt.toDate().toDateString().slice(3)}</$Text>
                        </$View>
                        {/* {item?.caption && <$Text className='text-white pl-1 mb-2 text-s'>{item.caption}</$Text>} */}
                        <$Text className='text-white pl-1 mb-2 text-s'>{item.caption ? item.caption : null}</$Text>
                        {item?.img &&
                            <FeedImg URL={item.img.url} aspectRatio={item.img.aspectRatio} />
                        }
                        {/* {item?.img && (item.img.type === 'image' ? <FeedImg URL={item.img.url} aspectRatio={item.img.aspectRatio} /> : <FeedVideo URL={item.img.url} aspectRatio={item.img.aspectRatio} />)} */}
                    </$View>
                </$View>

            ))}
        </>
    )
}

export default FeedLoader