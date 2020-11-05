import 'jest';
import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';

const testEnv = functions({
    databaseURL: 'https://unittestproject-c898a.firebaseio.com',
    projectId: 'unittestproject-c898a'
}, './service-account.json')

import * as myFunctions from '../src';

describe('onAddAdminMessage', () => {
    let wrapped: any;
    const path = 'Message/12345';
    beforeAll(() => {
        wrapped = testEnv.wrap(myFunctions.onAddAdminMessage);
    });
    

    test('Give new message doc then admin message exist', async () => {
        const snap = await testEnv.firestore.makeDocumentSnapshot({abc: "Google"}, path);
        console.log('Saved');
        wrapped(snap);

        const after = await admin.firestore().doc(path).get();
        expect(after.exists).toBe(true);

        const dataMessage = after.data()!.adminMessage;
        console.log(dataMessage!);
        expect(dataMessage).toBe('Welcome to the team');
    })
})