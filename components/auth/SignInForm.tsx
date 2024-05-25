import { Platform, TextStyle } from 'react-native'
import { icons } from '../../constants'
import React from 'react'
import { $Image, $Text, $TextInput, $TouchableWithoutFeedback, $View } from '../NativeWind';
interface SignInFormPropsSchema {
    email: string;
    password: string;
    isValid: boolean;
    handleValidChange: (isValid: boolean) => void;
    handleEmailChange: (email: string) => void;
    handlePasswordChange: (password: string) => void;
}
const SignInForm = ({ email, password, handleEmailChange, handlePasswordChange, handleValidChange }: SignInFormPropsSchema) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const verifyForm = () => {
        if (emailRegex.test(email) && passwordRegex.test(password)) {
            handleValidChange(true)
        } else {
            handleValidChange(false)
        }
    }
    const onPassChange = (password: string) => {
        if (!passwordRegex.test(password)) {
            //Alert.alert('Invalid Password', 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number');
        }
        verifyForm();
        handlePasswordChange(password);
    }
    const onEmailChange = (email: string) => {
        if (!emailRegex.test(email)) {
            //Alert.alert('Invalid Email', 'Please enter a valid email address');
        }
        verifyForm();
        handleEmailChange(email);
    }
    return (
        <$View className='justify-center items-center w-full gap-2 mt-3'>
            <$Text className='text-2xl font-bold mt-4 text-green-500'>Welcome To Portal</$Text>
            <$View className='flex-row border-2 border-gray-400 rounded-md w-full bg-slate-200'>
                <$TextInput
                    className=' p-2 text-black flex-1 '
                    placeholder='Email'
                    value={email}
                    onChangeText={onEmailChange}
                    placeholderTextColor={'black'}
                />
            </$View>
            <$View className='flex-row  border-2 border-gray-400 rounded-md w-full bg-slate-200'>
                <$TextInput
                    value={password}
                    style={Platform.OS === 'web' ? { outlineStyle: 'none' } as TextStyle : { borderColor: '#000' }}
                    className='border-transparent p-2 text-black flex-1'
                    placeholder='Password'
                    secureTextEntry={!showPassword}
                    onChangeText={onPassChange}
                    placeholderTextColor={'black'}
                />
                <$TouchableWithoutFeedback
                    onPress={handleState}
                    style={{
                        borderColor: 'transparent',
                    }}
                >
                    <$Image
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        resizeMode='contain'
                        className='w-8 h-8 self-center ml-2 mr-2'
                    />
                </$TouchableWithoutFeedback>
            </$View>
        </$View>
    )
}

export default SignInForm