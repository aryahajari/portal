
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});

const $SafeAreaView = styled(SafeAreaView);

const RootLayout = () => {
  return (
    <>
      <StatusBar style='light' />
      <$SafeAreaView className='flex-1 bg-dark'>
        <Stack>
          <Stack.Screen name="logIn" options={{ headerShown: false }} />
          <Stack.Screen name="signUp" options={{ headerShown: false }} />
          <Stack.Screen name="userInfo" options={{ headerShown: false }} />
        </Stack>
      </$SafeAreaView>
    </>
  )
}

export default RootLayout