import { Router } from 'express';

const router = Router();

import { db, auth } from '../firebase/firebaseConfig'
import { AuthError } from 'firebase/auth'
async function setUserName(username: string, uid: string) {
    const usersRef = db.collection('users');
    try {
        await db.runTransaction(async (transaction) => {
            const query = usersRef.where('userName', '==', username).limit(1);
            const snapshot = await transaction.get(query);
            if (!snapshot.empty) {
                throw new Error('Username already taken');
            }
            transaction.update(usersRef.doc(uid), { userName: username.toLowerCase() });
        });
    } catch (error) {
        throw error;
    }
}

async function isUserNameAvailabe(username: string) {
    const usersRef = db.collection('users');
    const query = usersRef.where('userName', '==', username.toLowerCase()).limit(1);
    const snapshot = await query.get();
    return snapshot.empty;
}

router.get('/checkUsername/:id', (req, res) => {
    const username = req.params.id;
    isUserNameAvailabe(username)
        .then((isAvailable) => {
            isAvailable ?
                res.status(200).json({ isAvailable })
                :
                res.status(400).json({ isAvailable })
        });
});
router.post('/setUsername', async (req, res) => {
    const { username, token } = req.body as { username: string, token: string };

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing.' });
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        console.log('Username:', decodedToken.uid);
        await setUserName(username.toLowerCase(), decodedToken.uid);
        res.status(200).json({ message: 'User created successfully!' });
    } catch (Err) {
        const error = Err as AuthError;
        switch (error.code) {
            case 'auth/id-token-expired':
                res.status(401).json({ message: 'Authorization token is expired.' });
                break;
            case 'auth/argument-error':
                res.status(400).json({ message: 'Invalid token.' });
                break;
            default:
                res.status(400).json({ message: error.message });
        }
    }
});

export default router;
