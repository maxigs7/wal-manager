import { getAuth, useAuthEmulator } from 'firebase/auth';
import { getFirestore, useFirestoreEmulator } from 'firebase/firestore';

export default (): void => {
  useFirestoreEmulator(getFirestore(), 'localhost', 9095);
  useAuthEmulator(getAuth(), 'http://localhost:9099', { disableWarnings: true });
};
