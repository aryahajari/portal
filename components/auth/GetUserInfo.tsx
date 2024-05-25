import { View, Text, Platform, TextStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { $Text, $TextInput, $TouchableOpacity, $View } from '../NativeWind'
import { useUserData } from '@/context/UserDataProvider'
import { firebaseFirestore } from '@/FirebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
const GetUserInfo = () => {
    const userData = useUserData();
    const [name, setName] = useState(userData?.name || '');
    const handleNameSubmit = async () => {
        if (name === '' || name === userData?.name) {
            return;
        }
        if (userData === null) return;
        const docRef = doc(firebaseFirestore, "users", userData.uid);
        try {
            await setDoc(docRef, { name: name }, { merge: true });
        } catch (e) {
            console.log(e)
        }
    }
    const [bio, setBio] = useState(userData?.bio || '');
    const handleBioSubmit = async () => {
        if (!userData || bio === '' || bio === userData?.bio) {
            return;
        }
        const docRef = doc(firebaseFirestore, "users", userData.uid);
        try {
            await setDoc(docRef, { bio: bio }, { merge: true });
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <$View className={`mt-2 mb-2 ${Platform.OS === 'web' && 'flex-1'}`}>
                {userData?.name || name !== '' ?
                    <$Text className='text-white'>Shown Name</$Text>
                    : null
                }
                <$View
                    className='w-full h-10 flex-row border-[2px] rounded-lg border-primary bg-primary'
                >
                    <$TextInput
                        style={Platform.OS === 'web' ? { outlineStyle: 'none' } as TextStyle : { borderColor: '#000' }}
                        value={name}
                        className={`border-0 text-black min-h-[30px] h-full flex-1 bg-white placeholder:text-black rounded-md`}
                        placeholder={userData?.name || 'name'}
                        placeholderTextColor={'black'}
                        onChangeText={(name) => { setName(name) }}
                    />
                    {name !== '' && name !== userData?.name && (
                        <$TouchableOpacity
                            className={`h-full justify-center items-center rounded-r-lg pl-2 pr-1 bg-primary`}
                            onPress={handleNameSubmit}
                        >
                            <$Text className='text-white text-xs font-bold'>confirm</$Text>
                        </$TouchableOpacity>
                    )}
                </$View>
            </$View>
            <$View className={`flex-1 mt-2 ${Platform.OS === 'web' && 'mb-5'}`}>
                {userData?.bio || bio !== '' ?
                    <$Text className='text-white'>Bio</$Text>
                    : null
                }
                <$View
                    className='w-full border-[2px] rounded-lg border-primary bg-primary'
                >
                    <$TextInput
                        style={Platform.OS === 'web' ? { outlineStyle: 'none' } as TextStyle : { borderColor: '#000' }}
                        value={bio}
                        multiline
                        numberOfLines={Platform.OS === 'web' ? 3 : 1}
                        className={`border-0 text-black min-h-[30px] p-1 h-full flex-1 bg-white placeholder:text-black rounded-md`}
                        placeholder={userData?.bio || 'bio'}
                        placeholderTextColor={'black'}
                        onChangeText={(bio) => { setBio(bio) }}
                    />
                    {bio !== '' && bio !== userData?.bio && (
                        <$TouchableOpacity
                            className={`h-7 justify-center items-center self-center rounded-r-lg pl-2 pr-1 bg-primary`}
                            onPress={handleBioSubmit}
                        >
                            <$Text className='text-white text-s font-bold'>confirm</$Text>
                        </$TouchableOpacity>
                    )}
                </$View>
            </$View>
        </>
    )
}

export default GetUserInfo