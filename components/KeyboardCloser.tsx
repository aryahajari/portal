import { $Image, $TouchableOpacity } from '@/components/NativeWind'
import { Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants';

const KeyboardCloser = () => {
    const [keyboardUse, setKeyboardUse] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (event) => {
                setKeyboardUse(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardUse(false);
            }
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        !keyboardUse ? null :
            <$TouchableOpacity
                className='mr-3 self-end'
                onPress={() => { Keyboard.dismiss() }}
            >
                <$Image
                    source={icons.buttons}
                    className={'w-8 h-7'}
                />
            </$TouchableOpacity>

    )
}

export default KeyboardCloser