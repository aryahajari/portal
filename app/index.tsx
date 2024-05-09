import { useRouter, Link, Stack, Redirect } from 'expo-router';
import { useEffect } from 'react';
//-----------------------------------------------------------------------------------------------
import { firebaseAuth } from '@/FirebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import { useGlobalContext } from '@/context/GlobalProvide';
//-----------------------------------------------------------------------------------------------

export default function App() {
  const router = useRouter();
  const { setUser, setIsSignedIn } = useGlobalContext();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (usr) => {
      if (usr) {
        console.log('email:  ', usr.email);
        router.replace('/home');
        setUser(usr.uid);
        setIsSignedIn(true);
      } else {
        router.replace('/logIn');
        setUser(null);
        setIsSignedIn(false);
      }
    });
  }, []);
}