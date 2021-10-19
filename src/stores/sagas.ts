import { Auth } from '@firebase/auth';
import { Firestore } from '@firebase/firestore';
import { all } from 'redux-saga/effects';

import { IUow } from '@app/models/uow';

import { sagas as accountsSagas } from './accounts';
import { sagas as authSagas } from './auth';
import { sagas as categoriesSagas } from './categories';
import { sagas as creditCardsSagas } from './credit-cards';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga(auth: Auth, _db: Firestore, uow: IUow) {
  yield all([
    ...accountsSagas(uow),
    ...authSagas(auth),
    ...categoriesSagas(uow),
    ...creditCardsSagas(uow),
  ]);
}
