import { Auth } from '@firebase/auth';
import { Firestore } from '@firebase/firestore';
import { all } from 'redux-saga/effects';

import { sagas as authSagas } from './auth';
import { sagas as categoriesSagas } from './categories';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga(auth: Auth, db: Firestore) {
  yield all([...authSagas(auth), ...categoriesSagas(db)]);
}
