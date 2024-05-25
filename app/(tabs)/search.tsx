import React, { useEffect } from 'react'
import { $Image, $Link, $ScrollView, $Text, $TextInput, $TouchableOpacity, $View } from '@/components/NativeWind'
import { icons } from '@/constants'
import { UserSchema } from '@/context/schema'
import { firebaseFirestore } from '@/FirebaseConfig'
import { collection, getDocs, query, where } from "firebase/firestore";
import ShowPFP from '@/components/page/ShowPFP'
const search = () => {
    const [searchText, setSearchText] = React.useState<string>('');
    const [users, setUsers] = React.useState<UserSchema[]>([]);
    useEffect(() => {
        searchUsernames(searchText);
    }, [searchText])
    async function searchUsernames(substring: string) {
        setSearchText(substring);
        const usersRef = collection(firebaseFirestore, "users");
        const start = substring;
        const end = substring.substring(0, substring.length - 1) + String.fromCharCode(substring.charCodeAt(substring.length - 1) + 1);
        const q = query(usersRef, where("userName", ">=", start.toLowerCase()), where("userName", "<", end.toLowerCase()));
        const querySnapshot = await getDocs(q);
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

                        className='bg-gray-700 text-white w-[90%] pl-4 rounded-full h-8'
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
                                    pathname: "(userProfile)/[userName]",
                                    params: { userName: userData.userName }
                                }}>
                                <$View className='flex-row items-center p-2  w-full'>
                                    <ShowPFP size={'h-12 w-12'} URL={userData.pfp} />
                                    <$View >
                                        <$Text className='text-white text-base pl-3 pb-0 pt-0 mt-0 mb-0'>{userData.name}</$Text>
                                        <$Text className='text-secondary-100 text-xs m pl-3 pb-0 pt-0 mt-0 mb-0'>@{userData.userName}</$Text>
                                    </$View>
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