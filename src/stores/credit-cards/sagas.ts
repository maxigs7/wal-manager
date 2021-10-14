import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from '@firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { CREDIT_CARD_COLLECTION } from '@app/models/constants';
import { CreditCard } from '@app/models/credit-cards';
import { converter } from '@lib/firebase';

import { selectUserId } from '../auth';
import {
  CREDIT_CARD_CREATE_REQUEST_FAIL,
  CREDIT_CARD_CREATE_REQUEST_SUCCESS,
  CREDIT_CARD_CREATE_REQUEST,
  CREDIT_CARD_REQUEST_FAIL,
  CREDIT_CARD_REQUEST_SUCCESS,
  CREDIT_CARD_REQUEST,
  CREDIT_CARD_UPDATE_REQUEST_FAIL,
  CREDIT_CARD_UPDATE_REQUEST_SUCCESS,
  CREDIT_CARD_UPDATE_REQUEST,
  CREDIT_CARDS_REQUEST_FAIL,
  CREDIT_CARDS_REQUEST_REFRESH,
  CREDIT_CARDS_REQUEST_SUCCESS,
  CREDIT_CARDS_REQUEST,
} from './actions';

function* requestCreditCards(db: Firestore) {
  try {
    const userId: string = yield select(selectUserId);
    const creditCardsRef = collection(db, CREDIT_CARD_COLLECTION).withConverter(
      converter<CreditCard>(),
    );
    const creditCardQuery = query<CreditCard>(
      creditCardsRef,
      where('userId', '==', userId),
      orderBy('name', 'asc'),
    );
    const snapshot: QuerySnapshot<CreditCard> = yield call(getDocs, creditCardQuery);
    const creditCards = snapshot.docs.map((doc) => doc.data());
    yield put(CREDIT_CARDS_REQUEST_SUCCESS(creditCards));
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

function* requestCreditCard(db: Firestore, action: PayloadAction<string>) {
  try {
    const docRef = doc(db, CREDIT_CARD_COLLECTION, action.payload).withConverter(
      converter<CreditCard>(),
    );
    const snapshot: DocumentSnapshot<CreditCard> = yield call(getDoc, docRef);
    if (!snapshot.exists()) {
      yield put(CREDIT_CARD_REQUEST_FAIL('CreditCard Not found'));
      return;
    }
    yield put(CREDIT_CARD_REQUEST_SUCCESS(snapshot.data()));
  } catch (error) {
    yield put(CREDIT_CARD_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* createCreditCard(db: Firestore, action: PayloadAction<CreditCard>) {
  try {
    const creditCardsRef = collection(db, CREDIT_CARD_COLLECTION);
    const docRef: DocumentReference = yield call(addDoc, creditCardsRef, action.payload);
    yield put(CREDIT_CARD_CREATE_REQUEST_SUCCESS(docRef.id));
  } catch (error) {
    yield put(CREDIT_CARD_CREATE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* updateCreditCard(db: Firestore, action: PayloadAction<CreditCard>) {
  try {
    const docRef = doc(db, CREDIT_CARD_COLLECTION, action.payload.id).withConverter(
      converter<CreditCard>(),
    );
    const setCreditCardDoc = (
      docRef: DocumentReference<CreditCard>,
      payload: CreditCard,
    ): Promise<void> => setDoc<CreditCard>(docRef, payload);
    yield call(setCreditCardDoc, docRef, action.payload);
    yield put(CREDIT_CARD_UPDATE_REQUEST_SUCCESS());
  } catch (error) {
    yield put(CREDIT_CARD_UPDATE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

export default (firestore: Firestore): any[] => [
  takeLatest(CREDIT_CARD_CREATE_REQUEST, createCreditCard, firestore),
  takeLatest(CREDIT_CARD_UPDATE_REQUEST, updateCreditCard, firestore),
  takeLatest(CREDIT_CARDS_REQUEST, requestCreditCards, firestore),
  takeLatest(CREDIT_CARDS_REQUEST_REFRESH, refreshCreditCards),
  takeLatest(CREDIT_CARD_REQUEST, requestCreditCard, firestore),
];
