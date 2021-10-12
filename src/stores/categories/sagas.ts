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
import { call, put, select, take, takeLatest } from 'redux-saga/effects';

import { Category } from '@app/models/categories';
import { CategoryType } from '@app/models/common';
import { converter } from '@lib/firebase';

import {
  CATEGORIES_REQUEST_REFRESH,
  CATEGORY_REQUEST,
  CATEGORY_REQUEST_FAIL,
  CATEGORY_SELECTED_BY_ID,
  selectSelectedType,
} from '.';
import { selectUserId } from '../auth';
import {
  IRequestCategory,
  IRequestSubCategory,
  CATEGORIES_REQUEST,
  CATEGORIES_REQUEST_FAIL,
  CATEGORIES_REQUEST_SUCCESS,
  CATEGORY_REQUEST_SUCCESS,
  SUBCATEGORIES_REQUEST,
  SUBCATEGORIES_REQUEST_FAIL,
  SUBCATEGORIES_REQUEST_SUCCESS,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_REQUEST_SUCCESS,
  CATEGORY_CREATE_REQUEST_FAIL,
  CATEGORY_UPDATE_REQUEST_FAIL,
  CATEGORY_UPDATE_REQUEST_SUCCESS,
  CATEGORY_UPDATE_REQUEST,
} from './actions';

const CATEGORY_COLLECTION = 'categories';

function* requestCategories(db: Firestore, action: PayloadAction<IRequestCategory>) {
  try {
    const categoriesRef = collection(db, CATEGORY_COLLECTION).withConverter(converter<Category>());
    const categoryQuery = query<Category>(
      categoriesRef,
      where('categoryType', '==', action.payload.categoryType),
      where('userId', '==', action.payload.userId),
      where('parentId', '==', null),
      orderBy('name', 'asc'),
    );
    const snapshot: QuerySnapshot<Category> = yield call(getDocs, categoryQuery);
    const categories = snapshot.docs.map((doc) => doc.data());
    yield put(CATEGORIES_REQUEST_SUCCESS(categories));
  } catch (error) {
    yield put(CATEGORIES_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* refreshCategories(action: PayloadAction<string | undefined>) {
  try {
    const userId: string = yield select(selectUserId);
    const categoryType: CategoryType = yield select(selectSelectedType);
    yield put(CATEGORIES_REQUEST({ userId, categoryType }));
    if (action.payload) {
      yield take(CATEGORIES_REQUEST_SUCCESS.type);
      yield put(CATEGORY_SELECTED_BY_ID(action.payload));
    }
  } catch (error) {
    yield put(CATEGORIES_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* requestSubCategories(db: Firestore, action: PayloadAction<IRequestSubCategory>) {
  try {
    const categoriesRef = collection(db, CATEGORY_COLLECTION).withConverter(converter<Category>());
    const categoryQuery = query<Category>(
      categoriesRef,
      where('parentId', '==', action.payload.categoryId),
      where('userId', '==', action.payload.userId),
      orderBy('name', 'asc'),
    );
    const snapshot: QuerySnapshot<Category> = yield call(getDocs, categoryQuery);
    const categories = snapshot.docs.map((doc) => doc.data());
    yield put(SUBCATEGORIES_REQUEST_SUCCESS(categories));
  } catch (error) {
    yield put(SUBCATEGORIES_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* requestCategory(db: Firestore, action: PayloadAction<string>) {
  try {
    const docRef = doc(db, CATEGORY_COLLECTION, action.payload).withConverter(
      converter<Category>(),
    );
    const snapshot: DocumentSnapshot<Category> = yield call(getDoc, docRef);
    if (!snapshot.exists()) {
      yield put(CATEGORY_REQUEST_FAIL('Category Not found'));
      return;
    }
    yield put(CATEGORY_REQUEST_SUCCESS(snapshot.data()));
  } catch (error) {
    yield put(CATEGORY_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* createCategory(db: Firestore, action: PayloadAction<Category>) {
  try {
    const categoriesRef = collection(db, CATEGORY_COLLECTION);
    const docRef: DocumentReference = yield call(addDoc, categoriesRef, action.payload);
    yield put(CATEGORY_CREATE_REQUEST_SUCCESS(docRef.id));
  } catch (error) {
    yield put(CATEGORY_CREATE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* updateCategory(db: Firestore, action: PayloadAction<Category>) {
  try {
    const docRef = doc(db, CATEGORY_COLLECTION, action.payload.id).withConverter(
      converter<Category>(),
    );
    const setCategoryDoc = (
      docRef: DocumentReference<Category>,
      payload: Category,
    ): Promise<void> => setDoc<Category>(docRef, payload);
    yield call(setCategoryDoc, docRef, action.payload);
    yield put(CATEGORY_UPDATE_REQUEST_SUCCESS());
  } catch (error) {
    yield put(CATEGORY_UPDATE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

export default (firestore: Firestore): any[] => [
  takeLatest(CATEGORY_CREATE_REQUEST, createCategory, firestore),
  takeLatest(CATEGORY_UPDATE_REQUEST, updateCategory, firestore),
  takeLatest(CATEGORIES_REQUEST, requestCategories, firestore),
  takeLatest(CATEGORIES_REQUEST_REFRESH, refreshCategories),
  takeLatest(CATEGORY_REQUEST, requestCategory, firestore),
  takeLatest(SUBCATEGORIES_REQUEST, requestSubCategories, firestore),
];
