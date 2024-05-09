import SignInForm from '@/components/SignInForm'
import UserNamePicker from '@/components/UserNamePicker'
import DateBirthPicker from '@/components/DateBirthPicker'
import { images } from '@/constants'
//---------------------------------------------------------------------------------------------------------
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth'
import { firebaseAuth } from '@/FirebaseConfig'
//---------------------------------------------------------------------------------------------------------
import { Link, router } from 'expo-router'
import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import { useState } from 'react';
import { styled } from 'nativewind'
const $View = styled(View);
const $Text = styled(Text);
const $ScrollView = styled(ScrollView);
const $Pressable = styled(Pressable);
const $Link = styled(Link);
const $Image = styled(Image);
//---------------------------------------------------------------------------------------------------------
const userInfo = () => {
    return (
        <>
            <$ScrollView className='bg-dark'>
                <$View className='justify-center self-center w-2/3'>
                    <UserNamePicker />
                    <DateBirthPicker />
                </$View>
            </$ScrollView>
        </>
    )
}

export default userInfo