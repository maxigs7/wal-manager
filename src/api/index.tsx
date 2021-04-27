import { IFirebaseAppProps } from '../firebase-config';
import { createAuthApi } from './auth';

export const createApi = (appFirebase: IFirebaseAppProps) => {
  return {
    ...createAuthApi(appFirebase),
  };
};
