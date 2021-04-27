import { createContext, useContext } from 'react';
import { IFirebaseAppProps } from '../firebase-config';

const firebaseContext = createContext<IFirebaseAppProps | null>(null);

export const FirebaseProvider = firebaseContext.Provider;

export const useFirebase = () => useContext(firebaseContext);
