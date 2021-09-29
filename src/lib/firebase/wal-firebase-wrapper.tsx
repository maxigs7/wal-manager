import { AuthProvider, FirestoreProvider } from 'reactfire';

import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

import setupEmulator from './setup-emulator';

export interface IWalFirebaseProps {
  authSdk: Auth;
  firestoreSdk: Firestore;
}

export const WalFirebaseWrapper: React.FC<IWalFirebaseProps> = ({
  authSdk,
  children,
  firestoreSdk,
}) => {
  // Check for dev/test mode however your app tracks that.
  // `process.env.NODE_ENV` is a common React pattern
  if (process.env.NODE_ENV !== 'production') {
    // Set up emulators
    setupEmulator(firestoreSdk, authSdk);
  }

  return (
    <AuthProvider sdk={authSdk}>
      <FirestoreProvider sdk={firestoreSdk}>{children}</FirestoreProvider>
    </AuthProvider>
  );
};
