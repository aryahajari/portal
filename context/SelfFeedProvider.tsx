import { firebaseFirestore } from '@/FirebaseConfig';
import { useRouter } from 'expo-router';
import { Timestamp, collection, query, where, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useState, useEffect, Dispatch, ReactNode, SetStateAction } from "react";
import { useUserData } from '@/context/UserDataProvider'
import { FeedSchema } from '@/context/schema';
const SelfFeedContext = createContext(null as FeedSchema[] | null);
export const SelfFeedContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const userData = useUserData();
    const [isSignedIn, setIsSignedIn] = useState<FeedSchema[] | null>(null);
    useEffect(() => {
        if (!userData) return;
        //console.log("User data found", userData);
        const q = query(
            collection(firebaseFirestore, "feeds"),
            where("uid", "==", userData.uid)
        );
        onSnapshot(q, (usr) => {
            const data = usr.docs.map((doc) => ({ ...doc.data(), feedId: doc.id }) as FeedSchema);
            setIsSignedIn(data);
        });
    }, [userData]);

    return (
        <SelfFeedContext.Provider value={isSignedIn} >
            {children}
        </SelfFeedContext.Provider>
    );
};

export const useSelfFeed = () => {
    const context = useContext(SelfFeedContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
