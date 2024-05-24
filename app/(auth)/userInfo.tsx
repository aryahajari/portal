import UserNamePicker from '@/components/UserNamePicker'
import DateBirthPicker from '@/components/DateBirthPicker'
import SetProfilePicture from '@/components/setPFP-Web'
import SetPFP from '@/components/SetPFP-phone'
import GetUserInfo from '@/components/GetUserInfo';
import SignOutBtn from '@/components/SignOutBtn'
import { Platform } from 'react-native'

//---------------------------------------------------------------------------------------------------------
import { useUserData } from '@/context/UserDataProvider'
import HeaderBackButton from '@/components/HeaderBackButton'
import { $Image, $ScrollView, $TouchableOpacity, $View } from '@/components/NativeWind'
import { icons } from '@/constants';
import { router } from 'expo-router';
//---------------------------------------------------------------------------------------------------------
const userInfo = () => {
    const userData = useUserData();
    if (!userData) return null;
    const valid = !(userData?.email && userData?.userName && userData?.dateOfBirth && userData?.bio && userData?.name)
    return (
        <>
            {userData?.bio && userData?.dateOfBirth && userData?.email && userData?.name && userData?.userName &&
                <$View className='pl-2 w-full flex-row justify-end bg-dark border-b-[1px] border-stone-500 pb-1'>
                    <$TouchableOpacity
                        onPress={() => { router.replace('/profile') }}
                        disabled={valid}
                        className='pr-3'
                    >
                        <$Image
                            source={icons.rightArrow}
                            resizeMode='contain'
                            className='h-6 w-6'
                        />
                    </$TouchableOpacity>
                </$View>
            }
            <$ScrollView className='bg-dark h-full pt-2'>
                <$View className='justify-center h-full overflow-hidden self-center w-2/3 p-1 lg:w-1/5'>
                    {Platform.OS === 'web' ? <SetProfilePicture /> : <SetPFP />}
                    <UserNamePicker />
                    <GetUserInfo />
                    <DateBirthPicker />
                    <SignOutBtn />
                </$View>
            </$ScrollView>
        </>
    )
}

export default userInfo