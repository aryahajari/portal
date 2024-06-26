import { Platform, TextStyle } from 'react-native';
import { useState } from 'react';
import { useUserData } from '@/context/UserDataProvider';
import { firebaseAuth } from '@/FirebaseConfig';
import { $Text, $TextInput, $TouchableOpacity, $View } from '../NativeWind';

const UserNamePicker = () => {
    const userData = useUserData();
    const [username, setUsername] = useState(userData?.userName || '');
    const [isAvailable, setIsAvailable] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const handleUsernameChange = async (newUsername: string) => {
        setUsername(newUsername);
        if (newUsername === '' || newUsername === userData?.userName) {
            setIsAvailable(true);
            setShowButton(false);
            return;
        }

        const response = await fetch(`https://widgets-6gobaiauka-uc.a.run.app//checkUsername/${newUsername}`, { method: 'GET' });
        const data = await response.json();
        setIsAvailable(data.isAvailable);
        setShowButton(data.isAvailable);
    };

    const confirmUsername = async () => {
        const token = await firebaseAuth.currentUser?.getIdToken(true);
        const response = await fetch('https://widgets-6gobaiauka-uc.a.run.app//setUsername', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, token })
        });
        const result = await response.json();

        if (response.ok) {
            setShowButton(false);
        } else if (result.message === 'Username already taken') {
            setIsAvailable(false);
            setShowButton(false);
        }
    };

    return (
        <$View className='w-full mt-2 mb-2'>
            {userData?.userName || username !== '' ?
                <$Text className='text-white'>Username</$Text>
                : null
            }
            <$View
                className={`w-full h-10 flex-row border-[2px] rounded-lg ${isAvailable || !showButton ? 'border-primary bg-primary' : 'border-red-500 bg-red-500'}`}
            >
                <$TextInput
                    style={Platform.OS === 'web' ? { outlineStyle: 'none' } as TextStyle : { borderColor: '#000' }}
                    value={username}
                    className={`border-0 text-black min-h-[30px] h-full flex-1 bg-white placeholder:text-black rounded-md`}
                    placeholder={userData?.userName || 'username'}
                    onChangeText={handleUsernameChange}
                    placeholderTextColor={'black'}
                />
                {username !== '' && showButton && (
                    <$TouchableOpacity
                        className={`h-full justify-center items-center rounded-r-lg pl-2 pr-1 ${isAvailable ? 'bg-primary' : 'bg-red-500'}`}
                        onPress={confirmUsername}
                        disabled={!isAvailable}
                    >
                        <$Text className='text-white text-xs font-bold'>
                            {showButton ? 'Confirm' : 'not available'}
                        </$Text>
                    </$TouchableOpacity>
                )}
            </$View>
        </$View>
    );
};

export default UserNamePicker;
