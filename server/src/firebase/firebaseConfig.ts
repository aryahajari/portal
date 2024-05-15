import * as admin from 'firebase-admin';
const serviceAccount = require('./portal-react-native-firebase-adminsdk-tbyyi-8fcc37127b.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();
