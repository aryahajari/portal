//user can follow 30,000-35,000 people
//usernames are 28 bytes & max document size is 1MB

import { db } from '../firebase/firebaseConfig'
import { Query } from 'firebase-admin/firestore'
async function getQueryInfo() {
    const q = db.collection('users').where("following", "array-contains", 'J7SDJiXwkHh4YTn1E3UcJK1zpia2');

    const results = await q.get();
    console.log('Results:', results.docs.map(doc => doc.data()));
    const explainResults = await q.count().explain({ analyze: true });
    const metrics = explainResults.metrics;
    const plan = metrics.planSummary;
    const indexesUsed = plan.indexesUsed;
    const stats = metrics.executionStats;
    console.log('Plan:', plan);
    console.log('Indexes used:', indexesUsed);
    console.log('Stats:', stats);
}
getQueryInfo();