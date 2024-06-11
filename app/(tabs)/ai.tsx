import { $ScrollView, $Text, $TouchableOpacity, $View } from '@/components/NativeWind'
import React, { useState } from 'react'
import { getVertexAI, getGenerativeModel, GenerationConfig } from "firebase/vertexai-preview";
import { firebaseApp } from '@/FirebaseConfig'
import { FirebaseError } from 'firebase/app';
import { Pressable } from 'react-native';
const vertexAI = getVertexAI(firebaseApp);
const generationConfig: GenerationConfig = {
    maxOutputTokens: 300,
    temperature: 0.2,
    topP: 0.95,
    topK: 40,
};
const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash", generationConfig });

const ai = () => {
    const [res, setResponse] = useState<string | null>(null);

    async function run() {
        const prompt = "tell me a joke"
        try {
            const result = await model.generateContent(prompt);
            setResponse(result.response.text());
        } catch (e) {
            setResponse("Error: " + (e as FirebaseError).message)
        }

    }
    return (
        <$ScrollView className='bg-dark'>
            <$TouchableOpacity className='h-14 justify-center items-center bg-primary-100 w-32 ' onPress={run}>
                <$Text className='text-black text-lg'>Try me</$Text>
            </$TouchableOpacity>
            <$Text className='text-white'>{res}</$Text>
        </$ScrollView>
    )
}

export default ai