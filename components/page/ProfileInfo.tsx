import React from 'react'
import { $Text, $View, $TouchableOpacity } from '../NativeWind'
import ShowPFP from './ShowPFP'
import { UserSchema } from '@/context/schema'
import { useUserData } from '@/context/UserDataProvider'
import FollowBtn from './FollowBtn'
import { getFollowerNumber } from '@/FirebaseConfig'
const profileInfo = (props: { userData: UserSchema | null, feed: number }) => {
  if (!props.userData) return null
  const [followerNumber, setFollowerNumber] = React.useState(0)
  getFollowerNumber(props.userData.uid).then((q) => {
    setFollowerNumber(q.count)
  })
  return (
    <$View className='w-full lg:w-1/2 lg:mr-auto lg:ml-auto'>
      <$View className='flex-row justify-between p-3'>
        <ShowPFP size={'h-24 w-24'} URL={props.userData.pfp} />
        <$View className='flex-1'>
          <$View className='flex-row flex-1 justify-around p-1'>
            <$View className='justify-center items-center'>
              <$Text className='text-white'>{props.feed}</$Text>
              <$Text className='text-white'>Feeds</$Text>
            </$View>
            <$View className='justify-center items-center'>
              <$Text className='text-white'>{followerNumber}</$Text>
              <$Text className='text-white'>Follower</$Text>
            </$View>
            <$View className='justify-center items-center'>
              <$Text className='text-white'>{props.userData?.following ? props.userData.following.length : 0}</$Text>
              <$Text className='text-white'>Following</$Text>
            </$View>
          </$View>
          <FollowBtn targetId={props.userData.uid} />
        </$View>
      </$View>
      <$View className='w-full pb-3 pt-0 flex justify-between'>
        <$Text className='text-white pb-2 text-base'>{props.userData.name}</$Text>
        <$Text className='text-white'>{props.userData.bio}</$Text>
      </$View>
    </$View>
  )
}

export default profileInfo