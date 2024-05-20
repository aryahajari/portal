import SignUpForm from '@/components/SignUpForm'
import { images } from '@/constants'
//---------------------------------------------------------------------------------------------------------
import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from '@/FirebaseConfig'
//---------------------------------------------------------------------------------------------------------
import { Link, router } from 'expo-router'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react';
import { styled } from 'nativewind'
const $View = styled(View);
const $Text = styled(Text);
const $ScrollView = styled(ScrollView);
const $TouchableOpacity = styled(TouchableOpacity);
const $Link = styled(Link);
const $Image = styled(Image);
//---------------------------------------------------------------------------------------------------------
const signUp = () => {
    interface FormData {
        email: string;
        password: string;
    }
    interface FormValidationSchema {
        email: boolean;
        password: boolean;
        retypePassword: boolean;
    }
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState<FormValidationSchema>({ email: false, password: false, retypePassword: false })
    const handleEmailChange = (email: string) => {
        setFormData({ ...formData, email });
    };
    const handlePassChange = (password: string) => {
        setFormData({ ...formData, password });
    };
    const handleValidation = (Errors: FormValidationSchema) => {
        setFormErrors(Errors)
    }
    //----------------------------------------------------------------------------------------------------
    async function InitializeUser(uid: string, email: string) {
        const userRef = doc(firebaseFirestore, 'users', uid);
        await setDoc(userRef, { uid: uid, email: email }, { merge: true })
            .then(() => { router.replace('/userInfo') })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
    const handleSignUp = async () => {
        console.log(formData.email, formData.password)
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, formData.email, formData.password);
            await InitializeUser(userCredential.user.uid, userCredential.user.email ?? '');
        } catch (error) {
            console.error('Authentication/Document error:', error);
        }
    }
    return (
        <>
            <$ScrollView className='bg-dark'>
                <$View className='justify-center self-center w-2/3 lg:w-1/5'>
                    <$Image
                        source={images.logoGreen}
                        resizeMode='contain'
                        className='self-center mt-10'
                        style={{ width: 200, height: 200 }}
                    />
                    <SignUpForm
                        validation={formErrors}
                        formData={formData}
                        handleValidationChange={handleValidation}
                        handleEmailChange={handleEmailChange}
                        handlePasswordChange={handlePassChange}
                    />
                    <$View className='w-full justify-center self-start mt-1 flex-1'>
                        <$TouchableOpacity
                            className='bg-primary pt-2 pb-2  justify-center items-center rounded-md flex-1'
                            onPress={() => { handleSignUp() }}
                        >
                            <$Text className='text-white p-0 m-0'>Sign Up</$Text>
                        </$TouchableOpacity>
                    </$View>
                </$View>
            </$ScrollView>
        </>
    )
}

export default signUp