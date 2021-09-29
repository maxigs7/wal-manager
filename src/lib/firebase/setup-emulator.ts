import { Auth, connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator, Firestore } from 'firebase/firestore';

export default (firestore: Firestore, auth: Auth): void => {
  connectFirestoreEmulator(firestore, 'localhost', 9095);
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
};
