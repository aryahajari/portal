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
import { $ScrollView, $View } from '@/components/NativeWind'
//---------------------------------------------------------------------------------------------------------
const userInfo = () => {
    const userData = useUserData();
    return (
        <>
            <HeaderBackButton href='profile' />
            <$ScrollView className='bg-dark h-full'>
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