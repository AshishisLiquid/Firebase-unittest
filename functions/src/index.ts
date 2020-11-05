import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

try{
    admin.initializeApp({ credential : admin.credential.applicationDefault()});
}catch(err){
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const onAddAdminMessage = functions.firestore.document('Message/{docID}').onCreate(async (snap, context) => {
    try {
        return snap.ref.set({ adminMessage : 'Welcome to the team'}, {merge : true});
    } catch (error) {
        console.log('failed because', error);
        return Promise.reject(error);
    }
});
