import { firebaseFirestore } from '@/FirebaseConfig';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import React from 'react';
import { useAuthContext } from '@/context/AuthDataProvider';
export const UserData = createContext<UserSchema | null>(null);
export const useUserData = () => {
    const context = useContext(UserData);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from 'expo-router';
import { UserSchema } from './schema';
export const GlobalUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserSchema | null>(null);
    const { isSignedIn, userId } = useAuthContext();
    const router = useRouter();
    useEffect(() => {
        if (!isSignedIn) return;
        if (!userId) return;
        onSnapshot(doc(firebaseFirestore, "users", userId),
            (documentSnapshot) => {
                if (documentSnapshot.exists()) {
                    const data = documentSnapshot.data() as UserSchema;
                    setUserData(data);
                } else {
                    console.error("User data not found", userId);
                    setUserData(null);
                }
            },
            error => {
                console.error("Firestore error:", error);
            });
    }, [userId, isSignedIn]);
    return (
        <UserData.Provider value={userData} >
            {children}
        </UserData.Provider>
    );
};