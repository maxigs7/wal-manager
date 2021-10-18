import { orderBy, where } from '@firebase/firestore';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { Account } from '@app/models/accounts';
import { IUow } from '@app/models/uow';

import { selectUserId } from '../auth';
import {
  ACCOUNTS_REQUEST_FAIL,
  ACCOUNTS_REQUEST_REFRESH,
  ACCOUNTS_REQUEST_SUCCESS,
  ACCOUNTS_REQUEST,
} from './actions';

function* requestAccounts(uow: IUow) {
  try {
    const { accounts: repo } = uow;
    const userId: string = yield select(selectUserId);
    const data: Account[] = yield call(
      repo.getAll,
      where('userId', '==', userId),
      orderBy('name', 'asc'),
    );
    yield put(ACCOUNTS_REQUEST_SUCCESS(data));
  } catch (error) {
    yield put(ACCOUNTS_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* refreshAccounts() {
  try {
    yield put(ACCOUNTS_REQUEST());
  } catch (error) {
    yield put(ACCOUNTS_REQUEST_FAIL(JSON.stringify(error)));
  }
}

export default (uow: IUow): any[] => [
  takeLatest(ACCOUNTS_REQUEST, requestAccounts, uow),
  takeLatest(ACCOUNTS_REQUEST_REFRESH, refreshAccounts),
];
