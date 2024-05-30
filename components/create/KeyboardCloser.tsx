import { $Image, $TouchableOpacity } from '@/components/NativeWind'
import { Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants';
import { HideKeyborad } from '@/constants/SVG';

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
                <HideKeyborad height={33} width={33} />
            </$TouchableOpacity>

    )
}

export default KeyboardCloser