import { orderBy, where } from '@firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { Account } from '@app/models/accounts';
import { IUow } from '@app/models/uow';

import { ACCOUNT_REMOVE_REQUEST } from '.';
import { selectUserId } from '../auth';
import {
  ACCOUNTS_REQUEST_FAIL,
  ACCOUNTS_REQUEST_REFRESH,
  ACCOUNTS_REQUEST_SUCCESS,
  ACCOUNTS_REQUEST,
  ACCOUNT_REQUEST_FAIL,
  ACCOUNT_REQUEST_SUCCESS,
  ACCOUNT_CREATE_REQUEST_SUCCESS,
  ACCOUNT_CREATE_REQUEST_FAIL,
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_REQUEST,
  ACCOUNT_UPDATE_REQUEST_SUCCESS,
  ACCOUNT_UPDATE_REQUEST_FAIL,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_REMOVE_REQUEST_SUCCESS,
  ACCOUNT_REMOVE_REQUEST_FAIL,
} from './actions';

/******************************
 * LIST
 */
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

/******************************
 * GET
 */
function* requestAccount(uow: IUow, action: PayloadAction<string>) {
  try {
    const { accounts: repo } = uow;
    const data: Account | null = yield call(repo.getById, action.payload);
    if (!data) {
      yield put(ACCOUNT_REQUEST_FAIL('Account Not found'));
      return;
    }
    yield put(ACCOUNT_REQUEST_SUCCESS(data));
  } catch (error) {
    yield put(ACCOUNT_REQUEST_FAIL(JSON.stringify(error)));
  }
}

/******************************
 * CREATE/UPDATE/REMOVE
 */
function* createAccount(uow: IUow, action: PayloadAction<Account>) {
  try {
    const { accounts: repo } = uow;
    const id: string = yield call(repo.create, action.payload);
    yield put(ACCOUNT_CREATE_REQUEST_SUCCESS(id));
  } catch (error) {
    yield put(ACCOUNT_CREATE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* updateAccount(uow: IUow, action: PayloadAction<Account>) {
  try {
    const { accounts: repo } = uow;
    yield call(repo.update, action.payload.id, action.payload);
    yield put(ACCOUNT_UPDATE_REQUEST_SUCCESS());
  } catch (error) {
    yield put(ACCOUNT_UPDATE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* removeAccount(uow: IUow, action: PayloadAction<string>) {
  try {
    const { accounts: repo } = uow;
    yield call(repo.remove, action.payload);
    yield put(ACCOUNT_REMOVE_REQUEST_SUCCESS());
  } catch (error) {
    yield put(ACCOUNT_REMOVE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

export default (uow: IUow): any[] => [
  takeLatest(ACCOUNT_CREATE_REQUEST, createAccount, uow),
  takeLatest(ACCOUNT_REMOVE_REQUEST, removeAccount, uow),
  takeLatest(ACCOUNT_REQUEST, requestAccount, uow),
  takeLatest(ACCOUNT_UPDATE_REQUEST, updateAccount, uow),
  takeLatest(ACCOUNTS_REQUEST, requestAccounts, uow),
  takeLatest(ACCOUNTS_REQUEST_REFRESH, refreshAccounts),
];
