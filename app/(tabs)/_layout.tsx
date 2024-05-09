import { View, Image, Text, ImageSourcePropType, ColorSchemeName, ColorValue } from 'react-native'
import { styled } from "nativewind";
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

const $View = styled(View);
const $Image = styled(Image);
const $Text = styled(Text)

interface TabIconInSchema {
    icon: ImageSourcePropType,
    color: ColorValue,
    name: any,
    focused: Boolean
}

const TabIcon = ({ icon, color, name, focused }: TabIconInSchema) => {
    return (
        <$View className='items-center justify-center'>
            <$Image
                source={icon}
                resizeMode="contain"
                className='w-auto h-6'
                tintColor={color}
            />
            {/* <$Text
                className='mb-2 first-line:'
            >
                {name}
            </$Text> */}
        </$View>
    )
}
const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#FFF',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    shadowColor: '#232533',
                    elevation: 0
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            focused={focused}
                            name="Home"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="bookmark"
                options={{
                    title: 'bookmark',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.bookmark}
                            color={color}
                            focused={focused}
                            name="Bookmark"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.plus}
                            color={color}
                            focused={focused}
                            name="create"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            focused={focused}
                            name="Profile"
                        />
                    )
                }}
            />
        </Tabs>
    )
}

export default TabsLayout