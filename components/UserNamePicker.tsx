import { View, Text, TextInput } from 'react-native'
import { styled } from 'nativewind'
const $View = styled(View);
const $Text = styled(Text);
const $TextInput = styled(TextInput);
import { useState } from 'react'

const UserNamePicker = () => {
    const [username, setUsername] = useState('')
    return (
        <$View className='w-full mt-2 mb-2'>
            {username == '' ? null : <$Text className='text-white'>Username</$Text>}
            <$TextInput
                value={username}
                className='border-primary border-2 p-2 text-black  flex-1 bg-white rounded-md'
                placeholder='Username'
                onChangeText={(username) => setUsername(username)}
            />
        </$View>
    )
}

export default UserNamePicker