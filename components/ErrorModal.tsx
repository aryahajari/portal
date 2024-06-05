import { Dispatch, SetStateAction, useState } from 'react'
import { $Modal, $Text, $View, $Pressable } from './NativeWind'
import { Platform } from 'react-native'
interface ErrorModalProps {
    setError: Dispatch<SetStateAction<string | null>>
    error: string | null
}
const ErrorModal = ({ error, setError }: ErrorModalProps) => {
    if (error !== null) {
        setTimeout(() => setError(null), 2500)
    }

    return (
        <$Modal
            visible={error !== null}
            animationType='slide'
            transparent={true}
        >
            <$View className='flex-1 justify-center'>
                <$View className='w-3/5 lg:w-1/4 border-red-500 border-2 rounded-xl  p-2 justify-center self-center bg-dark lg:mr-2 mg:mt-3'>
                    <$Pressable
                        onPress={() => setError(null)}
                        className='h-7 w-7 bg-red-500 self-end justify-center items-center p-0  rounded-full'
                    >
                        <$Text className='text-white text-xl m-0 p-0'>X</$Text>
                    </$Pressable>
                    <$Text className='text-white mb-2'>{error}</$Text>
                </$View>
            </$View>
        </$Modal>
    )
}

export default ErrorModal