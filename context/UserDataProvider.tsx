import { firebaseFirestore } from '@/FirebaseConfig';
import { User } from 'firebase/auth';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import React from 'react';
import { useAuthContext } from '@/context/AuthDataProvider';
export const UserData = createContext<UserSchema | null>(null);
export interface UserSchema {
    email: string;
    uid: string;
    pfp: string;
    userName: string;
    dateOfBirth: string;
}

export const useUserData = () => {
    const context = useContext(UserData);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
import { doc, onSnapshot } from "firebase/firestore";

export const GlobalUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserSchema | null>(null);
    const { isSignedIn, userId } = useAuthContext();
    useEffect(() => {
        if (!isSignedIn) return;
        if (!userId) return;
        onSnapshot(doc(firebaseFirestore, "users", userId),
            (documentSnapshot) => {
                if (documentSnapshot.exists()) {
                    setUserData(documentSnapshot.data() as UserSchema);
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