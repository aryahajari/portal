import { Pressable, Text } from 'react-native'
import { styled } from 'nativewind';
import { router } from 'expo-router';
const $Pressable = styled(Pressable);
const $Text = styled(Text);
import React from 'react'
import { firebaseAuth } from '@/FirebaseConfig';

const SignOutBtn = () => {
    return (
        <$Pressable
            className='bg-slate-300 p-2 justify-center items-center W-5 H-5'
            onPress={() => {
                firebaseAuth.signOut().then(() => {
                    router.replace('/logIn')
                });
            }}>
            <$Text className='text-white'>Sign Out</$Text>
        </$Pressable>
    )
}

export default SignOutBtn