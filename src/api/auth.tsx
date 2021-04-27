import { IFirebaseAppProps } from '../firebase-config';

export const createAuthApi = (appFirebase: IFirebaseAppProps) => {
  const {
    auth,
    providers: { google },
  } = appFirebase;

  return {
    signInWithGoogle: () => auth.signInWithPopup(google),
  };
};
