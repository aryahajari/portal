
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { NativeWindStyleSheet } from "nativewind";
import { useAuthContext } from '@/context/AuthDataProvider';
import { useUserData } from '@/context/UserDataProvider';
import { $View } from '@/components/NativeWind';
NativeWindStyleSheet.setOutput({
  default: "native",
});

const App = () => {
  const router = useRouter();
  const userData = useUserData();
  const authData = useAuthContext();
  useEffect(() => {
    if (authData?.isSignedIn) {
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
  }, [userData, authData])
  return (
    <$View className='flex-1 bg-dark'></$View>
  )
}

export default App;