import { $Image, $Link, $ScrollView, $Text, $TextInput, $TouchableOpacity, $TouchableWithoutFeedback, $View } from '@/components/NativeWind';
import { icons, images } from '@/constants'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from '@/FirebaseConfig'
import { router } from 'expo-router'
import { Platform, TextStyle } from 'react-native'
import { useEffect, useState } from 'react';


const signUp = () => {
    interface FormData {
        email: string;
        password: string;
        retypePassword: string;
    }
    interface FormValidationSchema {
        email: boolean;
        password: boolean;
        retypePassword: boolean;
    }
    const [formData, setFormData] = useState<FormData>({ email: '', password: '', retypePassword: '' });
    const [formErrors, setFormErrors] = useState<FormValidationSchema>({ email: false, password: false, retypePassword: false })
    const [showPassword, setShowPassword] = useState(false)
    const handleShowBtn = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }
    // validations -----------------------------------------------------
    useEffect(() => {
        if (formData.retypePassword !== '') {
            formData.password === formData.retypePassword ? setFormErrors({ ...formErrors, retypePassword: true }) : setFormErrors({ ...formErrors, retypePassword: false })
        }
    }, [formData.retypePassword, formData.password])


    const emailRegex = /^[a-zA-Z0-9._-]+@+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const onPassChange = (password: string) => {
        setFormData({ ...formData, password: password });
        if (formData.retypePassword !== '') {
            console.log(formData.retypePassword)
        }
        !passwordRegex.test(password) ? setFormErrors({ ...formErrors, password: false }) : setFormErrors({ ...formErrors, password: true })

    }
    const onEmailChange = (email: string) => {
        setFormData({ ...formData, email: email });
        !emailRegex.test(email) ? setFormErrors({ ...formErrors, email: false }) : setFormErrors({ ...formErrors, email: true })
        setFormData({ ...formData, email: email });
    }
    //----------------------------------------------------------------------------------------------------
    async function InitializeUser(uid: string, email: string) {
        const userRef = doc(firebaseFirestore, 'users', uid);
        await setDoc(userRef, { uid: uid, email: email }, { merge: true })
            .then(() => {
                router.replace('/home')
            });
    }
    const handleSignUp = async () => {
        console.log(formData.email, formData.password)
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, formData.email, formData.password);
            await InitializeUser(userCredential.user.uid, userCredential.user.email ?? '');
            router.replace('/userInfo')
        } catch (error) {
            console.error('Authentication/Document error:', error);
        }
    }
    return (
        <>
            <$ScrollView className='bg-dark'>
                <$View className='justify-center self-center w-2/3 lg:w-1/3'>
                    <$Image
                        source={images.logoGreen}
                        resizeMode='contain'
                        className='self-center mt-10'
                        style={{ width: 200, height: 200 }}
                    />
                    <$View className='justify-center items-center w-full gap-2 mt-3'>
                        <$Text className='text-2xl font-bold mt-4 text-green-500'>Welcome To Portal</$Text>
                        <$View
                            className='flex-row border-2 rounded-md w-full bg-slate-200'
                            style={{ borderColor: formErrors.email || formData.email == '' ? 'green' : 'red' }}
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
                            style={{ borderColor: formErrors.password || formData.password == '' ? 'green' : 'red' }}
                        >
                            <$TextInput
                                value={formData.password}
                                style={Platform.OS === 'web' ? { outlineStyle: 'none' } as TextStyle : { borderColor: '#000' }}
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
                            style={{ borderColor: formErrors.retypePassword ? 'green' : 'red' }}
                        >
                            <$TextInput
                                value={formData.retypePassword}
                                style={Platform.OS === 'web' ? { outlineStyle: 'none' } as TextStyle : { borderColor: '#000' } as TextStyle}
                                className='border-transparent p-2 text-black flex-1'
                                placeholder='Password'
                                placeholderTextColor={'black'}
                                secureTextEntry={!showPassword}
                                onChangeText={(retypePassword: string) => setFormData({ ...formData, retypePassword })}
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
                            style={{ display: formErrors.email || formData.email == '' ? 'none' : 'flex' }}
                            className='text-red-500 mb-2 self-start'
                        >
                            Invalid Email', 'Please enter a valid email address'</$Text>
                        <$Text
                            style={{ display: formErrors.password || formData.password == '' ? 'none' : 'flex' }}
                            className='text-red-500 mb-2 self-start'>Invalid Password', 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number</$Text>
                        <$Text
                            style={{ display: formErrors.retypePassword || formData.retypePassword == '' ? 'none' : 'flex' }}
                            className='text-red-500 mb-2 self-start'
                        >Password Does Not Match</$Text>

                    </$View >
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