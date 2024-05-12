
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'
import { NativeWindStyleSheet } from "nativewind";
import { GlobalProvider } from '../context/AuthDataProvider';
import { GlobalUserProvider } from '../context/UserDataProvider';
NativeWindStyleSheet.setOutput({
  default: "native",
});

const $SafeAreaView = styled(SafeAreaView);
const RootLayout = () => {
  return (
    <>
      <StatusBar style='light' />
      <GlobalProvider>
        <GlobalUserProvider>
          <$SafeAreaView className='flex-1 bg-dark'>
            <Slot />
          </$SafeAreaView>
        </GlobalUserProvider>
      </GlobalProvider>
    </>
  )
}

export default RootLayout