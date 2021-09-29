import { FirebaseAppProvider } from 'reactfire';

import { FirebaseApp } from '@firebase/app';

import { IWalFirebaseProps, WalFirebaseWrapper } from './wal-firebase-wrapper';

interface IProps extends IWalFirebaseProps {
  app: FirebaseApp;
}

export const WalFirebaseAppProvider: React.FC<IProps> = ({ app, children, ...props }) => (
  <FirebaseAppProvider firebaseApp={app}>
    <WalFirebaseWrapper {...props}>{children}</WalFirebaseWrapper>
  </FirebaseAppProvider>
);
