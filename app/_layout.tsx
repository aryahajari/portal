
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'
import { NativeWindStyleSheet } from "nativewind";
import { GlobalProvider } from '../context/GlobalProvide';
NativeWindStyleSheet.setOutput({
  default: "native",
});

const $SafeAreaView = styled(SafeAreaView);
const RootLayout = () => {
  return (
    <>
      <StatusBar style='light' />
      <GlobalProvider>
        <$SafeAreaView className='flex-1 bg-dark'>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </$SafeAreaView>
      </GlobalProvider>
    </>
  )
}

export default RootLayout