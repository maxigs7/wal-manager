import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '../config';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

export interface IFirebaseAppProps {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  providers: { google: firebase.auth.GoogleAuthProvider };
}

export const startFirebase = (): IFirebaseAppProps => {
  firebase.initializeApp(firebaseConfig);

  return {
    auth: firebase.auth(),
    db: firebase.firestore(),
    providers: {
      google: new firebase.auth.GoogleAuthProvider(),
    },
  };
};
