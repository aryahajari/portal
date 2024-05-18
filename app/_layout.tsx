
import React from 'react'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { NativeWindStyleSheet } from "nativewind";
import { GlobalProvider } from '../context/AuthDataProvider';
import { GlobalUserProvider } from '../context/UserDataProvider';
NativeWindStyleSheet.setOutput({
  default: "native",
});

const RootLayout = () => {
  return (
    <>
      <StatusBar style='light' />
      <GlobalProvider>
        <GlobalUserProvider>
          <Slot />
        </GlobalUserProvider>
      </GlobalProvider>
    </>
  )
}

export default RootLayout