import { Platform } from 'react-native'
import { icons } from '../constants'

import React, { useState } from 'react'
import { $Image, $Link, $Text, $TextInput, $TouchableWithoutFeedback, $View } from './NativeWind';
interface FormValidationSchema {
    email: boolean;
    password: boolean;
    retypePassword: boolean;
}
interface FormData {
    email: string;
    password: string;
}
interface SignUpFormPropsSchema {
    formData: FormData;
    validation: FormValidationSchema;
    handleValidationChange: (Errors: FormValidationSchema) => void;
    handleEmailChange: (email: string) => void;
    handlePasswordChange: (password: string) => void;
}
const SignUpForm = ({ formData, handleEmailChange, handlePasswordChange, handleValidationChange, validation }: SignUpFormPropsSchema) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleShowBtn = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }
    // validations -----------------------------------------------------
    const [retypePassword, setRetypePassword] = useState('')
    const handleRetypePasswordChange = (retypePassword: string) => {
        setRetypePassword(retypePassword)
        formData.password === retypePassword ? handleValidationChange({ ...validation, retypePassword: true }) : handleValidationChange({ ...validation, retypePassword: false })
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const onPassChange = (password: string) => {
        !passwordRegex.test(password) ? handleValidationChange({ ...validation, password: false }) : handleValidationChange({ ...validation, password: true })
        handlePasswordChange(password);
    }
    const onEmailChange = (email: string) => {
        !emailRegex.test(email) ? handleValidationChange({ ...validation, email: false }) : handleValidationChange({ ...validation, email: true })
        handleEmailChange(email);
    }
    return (
        <$View className='justify-center items-center w-full gap-2 mt-3'>
            <$Text className='text-2xl font-bold mt-4 text-green-500'>Welcome To Portal</$Text>
            <$View
                className='flex-row border-2 rounded-md w-full bg-slate-200'
                style={{ borderColor: validation.email || formData.email == '' ? 'green' : 'red' }}
            >
                <$TextInput
                    placeholderTextColor={'black'}
                    className=' p-2 text-black flex-1 '
                    placeholder='Email'
                    value={formData.email}
                    onChangeText={onEmailChange}
                />
            </$View>
            <$View
                className='flex-row  border-2 rounded-md w-full bg-slate-200'
                style={{ borderColor: validation.password || formData.password == '' ? 'green' : 'red' }}
            >
                <$TextInput
                    value={formData.password}
                    style={Platform.OS === 'web' ? { outlineStyle: 'none' } : { borderColor: '#000' }}
                    className='border-transparent p-2 text-black flex-1 placeholder:text-black'
                    placeholder='Password'
                    secureTextEntry={!showPassword}
                    onChangeText={onPassChange}
                    placeholderTextColor={'black'}
                />
                <$TouchableWithoutFeedback
                    onPress={handleShowBtn}
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
            <$View
                className='flex-row  border-2  rounded-md w-full bg-slate-200'
                style={{ borderColor: validation.retypePassword || retypePassword == '' ? 'green' : 'red' }}
            >
                <$TextInput
                    value={retypePassword}
                    style={Platform.OS === 'web' ? { outlineStyle: 'none' } : { borderColor: '#000' }}
                    className='border-transparent p-2 text-black flex-1'
                    placeholder='Password'
                    placeholderTextColor={'black'}
                    secureTextEntry={!showPassword}
                    onChangeText={(password) => { handleRetypePasswordChange(password) }}
                />
                <$TouchableWithoutFeedback
                    onPress={handleShowBtn}
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
            <$Text className='text-white mb-2 self-start' >
                have an account?
                <$Link
                    href={'/logIn'}
                    className='text-blue-500'
                >  Sign In
                </$Link>
            </$Text>
            <$Text
                style={{ display: validation.email || formData.email == '' ? 'none' : 'flex' }}
                className='text-red-500 mb-2 self-start'
            >
                Invalid Email', 'Please enter a valid email address'</$Text>
            <$Text
                style={{ display: validation.password || formData.password == '' ? 'none' : 'flex' }}
                className='text-red-500 mb-2 self-start'>Invalid Password', 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number</$Text>
            <$Text
                style={{ display: validation.retypePassword || retypePassword == '' ? 'none' : 'flex' }}
                className='text-red-500 mb-2 self-start'
            >Password Does Not Match</$Text>

        </$View >
    )
}

export default SignUpForm