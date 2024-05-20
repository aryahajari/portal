import React from 'react'
import { $Text, $View } from '../NativeWind'
import ShowPFP from '../ShowPFP'
import { UserSchema } from '@/context/schema'
const profileInfo = (props: { userData: UserSchema }) => {
  return (
    <$View className='w-full lg:w-1/2 lg:mr-auto lg:ml-auto'>
      <$View className='flex-row justify-between p-3'>
        <ShowPFP size={'h-24 w-24'} URL={props.userData.pfp} />
        <$View className='justify-center items-center'>
          <$Text className='text-white'> 0</$Text>
          <$Text className='text-white'>Feeds</$Text>
        </$View>
        <$View className='justify-center items-center'>
          <$Text className='text-white'> 0</$Text>
          <$Text className='text-white'>Follower</$Text>
        </$View>
        <$View className='justify-center items-center'>
          <$Text className='text-white'> 0</$Text>
          <$Text className='text-white'>Following</$Text>
        </$View>
      </$View>
      <$View className='w-full p-3'>
        <$Text className='text-white pb-2 text-base'>{props.userData.name}</$Text>
        <$Text className='text-white'>{props.userData.bio}</$Text>
      </$View>
    </$View>
  )
}

export default profileInfo