
import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { NativeWindStyleSheet } from "nativewind";
import { useAuthContext } from '../context/AuthDataProvider';
import { useUserData } from '../context/UserDataProvider';
import { Redirect } from 'expo-router'
import { $View } from '@/components/NativeWind';
NativeWindStyleSheet.setOutput({
  default: "native",
});

const App = () => {
  const router = useRouter();
  const userData = useUserData();
  const authData = useAuthContext();
  useEffect(() => {
    if (authData.isSignedIn === null) return
    if (!userData) return;
    if (authData.isSignedIn) {
      if (!(userData?.email && userData?.userName && userData?.dateOfBirth && userData?.bio && userData?.name)) {
        //logged in but missing user info
        router.replace('userInfo')
      } else {
        router.replace('/home')
      }
    } else {
      //not logged in
      router.replace('/logIn')
    }
  }, [authData.isSignedIn, userData])
  return (
    <$View className='flex-1 bg-dark'></$View>
  )
}

export default App;