import firebase from 'firebase/app';

import { startFirebase } from '../start-firebase';

jest.mock('../config', () => {
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

  beforeEach(() => {
    firebase.initializeApp = initializeAppMock;
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
});
