export const FIREBASE_API_KEY: string = process.env.REACT_APP_FIREBASE_API_KEY || '';
export const FIREBASE_AUTH_DOMAIN: string = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '';
export const FIREBASE_PROJECT_ID: string = process.env.REACT_APP_FIREBASE_PROJECT_ID || '';
export const FIREBASE_STORAGE_BUCKET: string = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '';
export const FIREBASE_MESSAGING_SENDER_ID: string =
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '';
export const FIREBASE_APP_ID: string = process.env.REACT_APP_FIREBASE_APP_ID || '';

export const FIREBASE_CONFIG = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};
