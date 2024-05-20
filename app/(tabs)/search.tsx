import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { $Image, $Link, $ScrollView, $Text, $TextInput, $TouchableOpacity, $View } from '@/components/NativeWind'
import { icons } from '@/constants'
import { router } from 'expo-router'
import { UserSchema } from '@/context/schema'
//---------------------------------------------------------------
import { firebaseFirestore } from '@/FirebaseConfig'
import { collection, getDocs, query, where } from "firebase/firestore";
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
        console.log(users)
    }
    return (
        <$View className='flex-1 bg-dark'>
            <$View className='flex-1 m-2 bg-dark lg:w-1/2 lg:mr-auto lg:ml-auto'>
                <$View className='flex-row justify-around'>
                    <$TouchableOpacity
                        onPress={() => { router.push('home') }}
                    >
                        <$Image
                            source={icons.leftArrow}
                            className='w-7 h-7 lg:w-10 lg:h-10'
                        />
                    </$TouchableOpacity>
                    <$TextInput
                        className='bg-gray-700 w-[90%] pl-4 rounded-full'
                        placeholder='Search'
                        placeholderTextColor='white'
                        onChangeText={setSearchText}
                        value={searchText}
                    />
                </$View>
                <$ScrollView className='w-full self-center' showsVerticalScrollIndicator={false}>
                    {users.map((userData, count) => (
                        <$Link href={{
                            pathname: "/(userProfile)/[userName]",
                            params: { userName: userData.userName }
                        }}>
                            <$View className='flex-row justify-between p-3'>
                                <$Text className='text-white'>{userData.userName}</$Text>
                            </$View>
                        </$Link>
                    ))}
                </$ScrollView>
            </$View>
        </$View>
    )
}

export default search