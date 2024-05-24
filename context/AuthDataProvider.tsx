import { firebaseAuth } from '@/FirebaseConfig';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextSchema } from './schema';
import { Platform } from 'react-native';

const AuthContext = createContext({} as AuthContextSchema);
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [userId, setUser] = useState<string | null>();
    const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
    const value = {
        setIsSignedIn,
        setUser,
        userId,
        isSignedIn
    } as AuthContextSchema;
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (usr) => {
            //signOut(firebaseAuth);
            if (usr) {
                //signOut(firebaseAuth);
                console.log(usr.uid);
                setUser(usr.uid);
                setIsSignedIn(true);
                if (Platform.OS === 'web') {
                    router.replace('/home')
                }
            } else {
                console.log('not signed in');
                setUser(null);
                setIsSignedIn(false);
                if (Platform.OS === 'web') {
                    router.replace('/logIn')
                }
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
