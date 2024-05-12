import { View, Text, TextInput } from 'react-native'
import { styled } from 'nativewind'
const $View = styled(View);
const $Text = styled(Text);
const $TextInput = styled(TextInput);
import { useState } from 'react'
//---------------------------------------------------------------------------------------------------------
import { collection, query, where, getDocs } from "firebase/firestore";
import { firebaseFirestore } from '@/FirebaseConfig'
import { useUserData } from '@/context/UserDataProvider'

async function isUserNameAvailable(username: string) {
    const usersCollection = collection(firebaseFirestore, "users");
    const q = query(usersCollection, where("userName", "==", username));
    return await getDocs(q).then((querySnapshot) => {
        return querySnapshot.size === 0;
    });
}

const UserNamePicker = () => {
    const userData = useUserData();

    const [username, setUsername] = useState('')
    const [isAvailable, setIsAvailable] = useState(false)

    async function onUserInChnage(userName: string) {
        setUsername(userName)
        setIsAvailable(await isUserNameAvailable(username))
        console.log(isAvailable);
    }
    return (
        <$View className='w-full mt-2 mb-2'>
            {username == '' ? null : <$Text className='text-white'>Username</$Text>}
            <$View className='w-full h-full flex-1'>
                <$TextInput
                    value={username}
                    className='border-primary border-2 p-2 text-black h-full flex-1 bg-white rounded-md placeholder:text-black'
                    placeholder='Username'
                    onChangeText={onUserInChnage}
                    placeholderTextColor={'black'}
                />
            </$View>
        </$View>
    )
}

export default UserNamePicker