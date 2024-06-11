
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { NativeWindStyleSheet } from "nativewind";
import { AuthProvider } from '@/context/AuthDataProvider';
import { GlobalUserProvider } from '../context/UserDataProvider';
NativeWindStyleSheet.setOutput({
  default: "native",
});

const RootLayout = () => {
  return (
    <>
      <StatusBar style='light' />
      <AuthProvider>
        <GlobalUserProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(userProfile)" options={{ headerShown: false }} />
          </Stack>
        </GlobalUserProvider>
      </AuthProvider>
    </>
  )
}

export default RootLayout