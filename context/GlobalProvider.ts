import { firebaseAuth } from '@/FirebaseConfig';
import { User } from 'firebase/auth';
import { createContext, useContext, useState, useEffect } from "react";

// Define the type for the context state
interface GlobalContextType {
    user: User | null;
    isSignedIn: boolean;
    setUser: (user: User | null) => void;
    setIsSignedIn: (isSignedIn: boolean) => void;
}

// Create the context
const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

// Define the provider component
type GlobalProviderProps = {
    children: React.ReactNode;
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    // Value to be passed to provider
    const value = {
        setIsSignedIn,
        setUser,
        user,
        isSignedIn
    };

    return (
        <GlobalContext.Provider value= { value } >
        { children }
        < /GlobalContext.Provider>
    );
};