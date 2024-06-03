import * as admin from 'firebase-admin';
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();
