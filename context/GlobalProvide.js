import { firebaseAuth } from '@/FirebaseConfig';
import { User } from 'firebase/auth';
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();


export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);

    const value = {
        setIsSignedIn,
        setUser,
        user,
        isSignedIn
    };

    return (
        <GlobalContext.Provider value={value} >
            {children}
        </GlobalContext.Provider>
    );
};