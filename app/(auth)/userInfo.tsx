import UserNamePicker from '@/components/auth/UserNamePicker'
import DateBirthPicker from '@/components/auth/DateBirthPicker'
import SetProfilePicture from '@/components/auth/setPFP-Web'
import SetPFP from '@/components/auth/SetPFP-phone'
import GetUserInfo from '@/components/auth/GetUserInfo';
import { Platform } from 'react-native'
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '@/FirebaseConfig';
//---------------------------------------------------------------------------------------------------------
import { useUserData } from '@/context/UserDataProvider'
import { $ScrollView, $TouchableOpacity, $View } from '@/components/NativeWind'
import { router } from 'expo-router';
import { LogOutIcon, NextIcon } from '@/constants/SVG';
//---------------------------------------------------------------------------------------------------------
const userInfo = () => {
    const userData = useUserData();
    if (!userData) return null;
    const valid = !(userData?.email && userData?.userName && userData?.dateOfBirth && userData?.bio && userData?.name)
    return (
        <>
            {userData?.bio && userData?.dateOfBirth && userData?.email && userData?.name && userData?.userName &&
                <$View className='pl-2 w-full flex-row justify-between bg-dark border-b-[1px] border-stone-500 pb-1'>
                    <$TouchableOpacity
                        onPress={() => {
                            firebaseAuth.signOut().then(() => {
                                router.replace('/logIn')
                            });
                        }}
                        className='pl-3'
                    >
                        <LogOutIcon width={30} height={30} />
                    </$TouchableOpacity>
                    <$TouchableOpacity
                        onPress={() => { router.replace('/profile') }}
                        disabled={valid}
                        className='pr-3'
                    >
                        <NextIcon height={30} width={30} />
                    </$TouchableOpacity>

                </$View>
            }
            <$ScrollView className='bg-dark h-full pt-2'>
                <$View className='justify-center overflow-hidden self-center w-2/3 p-1 mt-3 lg:w-1/5'>
                    {Platform.OS === 'web' ? <SetProfilePicture /> : <SetPFP />}
                    <UserNamePicker />
                    <GetUserInfo />
                    <DateBirthPicker />
                </$View>
            </$ScrollView>
        </>
    )
}

export default userInfo