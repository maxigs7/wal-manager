import firebase from 'firebase/app';

import { startFirebase } from '../index';

jest.mock('../../config/firebase', () => {
  return {
    FIREBASE_API_KEY: 'key',
    FIREBASE_AUTH_DOMAIN: 'domain',
    FIREBASE_PROJECT_ID: 'project',
    FIREBASE_STORAGE_BUCKET: 'bucket',
    FIREBASE_MESSAGING_SENDER_ID: 'sender',
    FIREBASE_APP_ID: 'app',
  };
});
jest.mock('firebase/app');

describe('startFirebase', () => {
  const initializeAppMock = jest.fn();
  const authMock = jest.fn();
  const firestoreMock = jest.fn();
  // @ts-ignore
  authMock.GoogleAuthProvider = jest.fn();

  beforeEach(() => {
    firebase.initializeApp = initializeAppMock;
    // @ts-ignore
    firebase.auth = authMock;
    // @ts-ignore
    firebase.firestore = firestoreMock;
  });
  it('firebase methods should be initialized with correct values', () => {
    const expectedConfig = {
      apiKey: 'key',
      authDomain: 'domain',
      projectId: 'project',
      storageBucket: 'bucket',
      messagingSenderId: 'sender',
      appId: 'app',
    };
    startFirebase();
    expect(initializeAppMock).toHaveBeenCalled();
    expect(initializeAppMock.mock.calls[0][0]).toEqual(expectedConfig);
  });

  it('firebase methods should be called', () => {
    startFirebase();
    expect(authMock).toHaveBeenCalled();
    expect(firestoreMock).toHaveBeenCalled();
    // @ts-ignore
    expect(authMock.GoogleAuthProvider).toHaveBeenCalled();
  });
});
