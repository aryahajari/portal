import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { $Image, $Link, $ScrollView, $Text, $TextInput, $TouchableOpacity, $View } from '@/components/NativeWind'
import { icons } from '@/constants'
import { router } from 'expo-router'
import { UserSchema } from '@/context/schema'
//---------------------------------------------------------------
import { firebaseFirestore } from '@/FirebaseConfig'
import { collection, getDocs, query, where } from "firebase/firestore";
import ShowPFP from '@/components/ShowPFP'
const usersRef = collection(firebaseFirestore, "users");
const search = () => {
    const [searchText, setSearchText] = React.useState<string>('');
    const [users, setUsers] = React.useState<UserSchema[]>([]);

    useEffect(() => {
        searchUsernames(searchText);
    }, [searchText])
    async function searchUsernames(substring: string) {
        setSearchText(substring);
        const usersRef = collection(firebaseFirestore, "users");

        // Create the start and end points of the query
        const start = substring;
        const end = substring.substring(0, substring.length - 1) + String.fromCharCode(substring.charCodeAt(substring.length - 1) + 1);

        // Create a query that searches for usernames within the range
        const q = query(usersRef, where("userName", ">=", start), where("userName", "<", end));

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Output the results
        // querySnapshot.forEach(doc => {
        //     console.log(`${doc.id} => ${doc.data().userName}`);
        // });
        setUsers(querySnapshot.docs.map(doc => doc.data() as UserSchema))
    }
    return (
        <$View className='flex-1 bg-dark'>
            <$View className='flex-1 m-2 bg-dark lg:w-1/2 lg:mr-auto lg:ml-auto justify-center'>
                <$View className='flex-row justify-around mb-2'>
                    <$TouchableOpacity
                        onPress={() => { }}
                        className='mt-auto mb-auto'
                    >
                        <$Image
                            source={icons.search}
                            className='w-6 h-6 lg:w-8 lg:h-8'
                        />
                    </$TouchableOpacity>
                    <$TextInput
                        className='bg-gray-700 w-[90%] pl-4 rounded-full h-10'
                        placeholder='Search'
                        placeholderTextColor='white'
                        onChangeText={setSearchText}
                        value={searchText}
                    />
                </$View>
                <$ScrollView className='w-full self-center' showsVerticalScrollIndicator={false}>
                    {users.map((userData, count) => (
                        <$View className='border-b-[1px] border-stone-300' key={userData.uid}>
                            <$Link
                                className='w-full'
                                href={{
                                    pathname: "/(userProfile)/[userName]",
                                    params: { userName: userData.userName }
                                }}>
                                <$View className='flex-row items-center p-3  w-full'>
                                    <ShowPFP size={'h-16 w-16'} URL={userData.pfp} />
                                    <$Text className='text-white text-lg pl-3'>{userData.userName}</$Text>
                                </$View>
                            </$Link>
                        </$View>
                    ))}
                </$ScrollView>
            </$View>
        </$View>
    )
}

export default search