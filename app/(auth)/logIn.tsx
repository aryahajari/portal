import SignInForm from '@/components/auth/SignInForm'
import { images } from '@/constants'
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth'
import { firebaseAuth } from '@/FirebaseConfig'
import { Link, router } from 'expo-router'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react';
import { styled } from 'nativewind'
import ErrorModal from '@/components/ErrorModal'
const $View = styled(View);
const $Text = styled(Text);
const $ScrollView = styled(ScrollView);
const $TouchableOpacity = styled(TouchableOpacity);
const $Link = styled(Link);
const $Image = styled(Image);
const signUp = () => {
    interface FormData {
        email: string;
        password: string;
        isValid: boolean;
    }
    const [formData, setFormData] = useState<FormData>({ email: '', password: '', isValid: true });
    const handleEmailChange = (email: string) => {
        setFormData({ ...formData, email });
    };
    const handlePassChange = (password: string) => {
        setFormData({ ...formData, password });
    };
    const handleValidationChange = (isValid: boolean) => {
        setFormData({ ...formData, isValid });
    }
    //----------------------------------------------------------------------------------------------------
    const handleSignIn = async () => {
        await signInWithEmailAndPassword(firebaseAuth, formData.email, formData.password)
            .then(() => {
                console.log('signed in')
                router.replace('/home')
            })
            .catch((error: AuthError) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        setError('Invalid Email\nPlease enter a valid email')
                        break;
                    case 'auth/too-many-requests':
                        setError('Too many requests\nPlease try again later')
                        break;
                    case 'auth/network-request-failed':
                        setError('Network request failed\nPlease check your internet connection')
                        break;
                    case 'auth/missing-password':
                        setError('Missing Password\nPlease enter a password')
                        break;
                    case 'auth/invalid-credential':
                        setError('Invalid Credential\nPlease check your email and password')
                        break;
                    default:
                        setError('An error occurred\nPlease try again')
                        break;
                }
            })
    }
    const [error, setError] = useState<string | null>(null)
    return (
        <>
            <ErrorModal error={error} setError={setError} />
            <$ScrollView className='bg-dark'>
                <$View className='justify-center self-center w-2/3 lg:w-1/3'>
                    <$Image
                        source={images.logoGreen}
                        resizeMode='contain'
                        className='self-center mt-10'
                        style={{ width: 200, height: 200 }}
                    />
                    <SignInForm
                        isValid={true}
                        email={formData.email}
                        password={formData.password}
                        handleValidChange={handleValidationChange}
                        handleEmailChange={handleEmailChange}
                        handlePasswordChange={handlePassChange}
                    />
                    <$View className='w-full justify-center self-start gap-2 mt-1'>
                        <$Text className='text-white p-0 m-0' >
                            Don't have an account?
                            <$Link
                                href={'/signUp'}
                                className='text-blue-500'
                            >  Sign Up
                            </$Link>
                        </$Text>
                        <$TouchableOpacity
                            className='bg-primary p-0  justify-center items-center rounded-md flex-1 pb-2 pt-2'
                            onPress={() => { handleSignIn() }}
                        >
                            <$Text className='text-white p-0 m-0'>Sign In</$Text>
                        </$TouchableOpacity>
                    </$View>
                </$View>
            </$ScrollView>
        </>
    )
}

export default signUp