import { orderBy, where } from '@firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { CreditCard } from '@app/models/credit-cards';
import { IUow } from '@app/models/uow';

import { CREDIT_CARD_REMOVE_REQUEST } from '.';
import { selectUserId } from '../auth';
import {
  CREDIT_CARDS_REQUEST_FAIL,
  CREDIT_CARDS_REQUEST_REFRESH,
  CREDIT_CARDS_REQUEST_SUCCESS,
  CREDIT_CARDS_REQUEST,
  CREDIT_CARD_REQUEST_FAIL,
  CREDIT_CARD_REQUEST_SUCCESS,
  CREDIT_CARD_CREATE_REQUEST_SUCCESS,
  CREDIT_CARD_CREATE_REQUEST_FAIL,
  CREDIT_CARD_CREATE_REQUEST,
  CREDIT_CARD_REQUEST,
  CREDIT_CARD_UPDATE_REQUEST_SUCCESS,
  CREDIT_CARD_UPDATE_REQUEST_FAIL,
  CREDIT_CARD_UPDATE_REQUEST,
  CREDIT_CARD_REMOVE_REQUEST_SUCCESS,
  CREDIT_CARD_REMOVE_REQUEST_FAIL,
} from './actions';

/******************************
 * LIST
 */
function* requestCreditCards(uow: IUow) {
  try {
    const { creditCards: repo } = uow;
    const userId: string = yield select(selectUserId);
    const data: CreditCard[] = yield call(
      repo.getAll,
      where('userId', '==', userId),
      orderBy('name', 'asc'),
    );
    yield put(CREDIT_CARDS_REQUEST_SUCCESS(data));
  } catch (error) {
    yield put(CREDIT_CARDS_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* refreshCreditCards() {
  try {
    yield put(CREDIT_CARDS_REQUEST());
  } catch (error) {
    yield put(CREDIT_CARDS_REQUEST_FAIL(JSON.stringify(error)));
  }
}

/******************************
 * GET
 */
function* requestCreditCard(uow: IUow, action: PayloadAction<string>) {
  try {
    const { creditCards: repo } = uow;
    const data: CreditCard | null = yield call(repo.getById, action.payload);
    if (!data) {
      yield put(CREDIT_CARD_REQUEST_FAIL('CreditCard Not found'));
      return;
    }
    yield put(CREDIT_CARD_REQUEST_SUCCESS(data));
  } catch (error) {
    yield put(CREDIT_CARD_REQUEST_FAIL(JSON.stringify(error)));
  }
}

/******************************
 * CREATE/UPDATE/REMOVE
 */
function* createCreditCard(uow: IUow, action: PayloadAction<CreditCard>) {
  try {
    const { creditCards: repo } = uow;
    const id: string = yield call(repo.create, action.payload);
    yield put(CREDIT_CARD_CREATE_REQUEST_SUCCESS(id));
  } catch (error) {
    yield put(CREDIT_CARD_CREATE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* updateCreditCard(uow: IUow, action: PayloadAction<CreditCard>) {
  try {
    const { creditCards: repo } = uow;
    yield call(repo.update, action.payload.id, action.payload);
    yield put(CREDIT_CARD_UPDATE_REQUEST_SUCCESS());
  } catch (error) {
    yield put(CREDIT_CARD_UPDATE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* removeCreditCard(uow: IUow, action: PayloadAction<string>) {
  try {
    const { creditCards: repo } = uow;
    yield call(repo.remove, action.payload);
    yield put(CREDIT_CARD_REMOVE_REQUEST_SUCCESS());
  } catch (error) {
    yield put(CREDIT_CARD_REMOVE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

export default (uow: IUow): any[] => [
  takeLatest(CREDIT_CARD_CREATE_REQUEST, createCreditCard, uow),
  takeLatest(CREDIT_CARD_REMOVE_REQUEST, removeCreditCard, uow),
  takeLatest(CREDIT_CARD_REQUEST, requestCreditCard, uow),
  takeLatest(CREDIT_CARD_UPDATE_REQUEST, updateCreditCard, uow),
  takeLatest(CREDIT_CARDS_REQUEST, requestCreditCards, uow),
  takeLatest(CREDIT_CARDS_REQUEST_REFRESH, refreshCreditCards),
];
