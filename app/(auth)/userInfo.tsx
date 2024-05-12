import SignInForm from '@/components/SignInForm'
import UserNamePicker from '@/components/UserNamePicker'
import DateBirthPicker from '@/components/DateBirthPicker'
import SetProfilePicture from '@/components/SetProfilePicture'
import SetPFP from '@/components/SetPFP'
import { images } from '@/constants'
//---------------------------------------------------------------------------------------------------------
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth'
import { firebaseAuth } from '@/FirebaseConfig'
//---------------------------------------------------------------------------------------------------------
import { Link, router } from 'expo-router'
import { View, Text, Pressable, Image, Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { useState, useEffect } from 'react';
import { styled } from 'nativewind'
//---------------------------------------------------------------------------------------------------------
import { useUserData } from '@/context/UserDataProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
//---------------------------------------------------------------------------------------------------------
const $View = styled(View);
const $Text = styled(Text);
const $ScrollView = styled(ScrollView);
const $Pressable = styled(Pressable);
const $Link = styled(Link);
const $Image = styled(Image);
const $SafeAreaView = styled(SafeAreaView);
//---------------------------------------------------------------------------------------------------------
const userInfo = () => {
    const userData = useUserData();
    return (
        <>
            <$SafeAreaView className='bg-dark'>
                <$ScrollView className='bg-dark h-full'>
                    <$View className='justify-center h-full overflow-hidden self-center w-2/3 p-1 lg:w-1/5'>
                        {Platform.OS === 'web' ? <SetProfilePicture /> : <SetPFP />}
                        <UserNamePicker />
                        <DateBirthPicker />
                        <$Text className='text-white'>{userData?.email}</$Text>
                    </$View>
                </$ScrollView>
            </$SafeAreaView>
        </>
    )
}

export default userInfo