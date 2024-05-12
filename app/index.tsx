
import React, { useEffect } from 'react'
import { Slot, Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'
import { NativeWindStyleSheet } from "nativewind";
import { useAuthContext } from '../context/AuthDataProvider';
import { useUserData } from '../context/UserDataProvider';
import { Redirect } from 'expo-router'
NativeWindStyleSheet.setOutput({
  default: "native",
});

const $SafeAreaView = styled(SafeAreaView);
const App = () => {
  const router = useRouter();
  const userData = useUserData();
  const authData = useAuthContext();
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      {authData.isSignedIn ? <Redirect href={'/home'} /> : <Redirect href={'/logIn'} />}
    </>
  )
}

export default App;