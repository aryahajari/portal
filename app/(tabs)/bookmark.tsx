import React from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, Button } from 'react-native';
import { styled } from 'nativewind';
const $View = styled(View);
const $Button = styled(Button);
const $TextInput = styled(TextInput);
const App = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <$View
                className='w-full bg-dark items-center justify-center'
            >
                <$TextInput
                    placeholder="Type here..."
                    multiline
                    className='rounded-lg text-white p-2 border-2 placeholder-white w-1/2'
                />
            </$View>


            <$View
                className='w-full bg-dark items-center justify-center'
            >
                <$TextInput
                    placeholder="Type here..."
                    multiline
                    className='rounded-lg text-white p-2 border-2 placeholder-white w-1/2 h-40'
                />
            </$View>



            <$View className='w-full h-10 flex-row bg-slate-200'>
                <$View className='w-1/2'>
                    <$Button title='Add Image' onPress={() => { }} />
                </$View>
                <$View className='w-1/2'>
                    <$Button title='Post' onPress={() => { }} />
                </$View>
            </$View>
        </KeyboardAvoidingView>
    );
};


export default App;
