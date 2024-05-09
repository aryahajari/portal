import { View, Text } from 'react-native'
import { styled } from "nativewind";
import React from 'react'
import { Link } from 'expo-router';

const $View = styled(View);
const $Text = styled(Text);
const $Link = styled(Link);

const home = () => {
    return (
        <$View className='justify-center items-center' style={{ justifyContent: 'center', alignItems: 'center' }}>
            <$Text>home</$Text>
            <$Link href={'/userInfo'}>
                <$Text>userInfo</$Text>
            </$Link>
        </$View>
    )
}

export default home