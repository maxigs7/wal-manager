// Firebase App (the core Firebase SDK) is always required and must be listed first
import { getApps, initializeApp } from 'firebase/app';

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from './config';

export const startFirebase = (): void => {
  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
  };

  if (!getApps().length) {
    initializeApp(firebaseConfig);
    // Check that `window` is in scope for the analytics module!
    // if (typeof window !== 'undefined') {
    //   // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    //   if ('measurementId' in firebaseConfig) {
    //     firebase.analytics();
    //     firebase.performance();
    //   }
    // }
  }
};
