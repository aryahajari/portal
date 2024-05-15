
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
  console.log("authData", userData)
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      {/* is signedIn is null do nothing if signedIn is true do nothing if signedIn is false redirect to logIn */}
      {authData.isSignedIn === null || authData.isSignedIn === true || <Redirect href={'/logIn'} />}
    </>
  )
}

export default App;