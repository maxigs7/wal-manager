import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from '@firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { Category } from '@app/api/categories';
import { converter } from '@lib/firebase';

import {
  IRequestCategory,
  IRequestSubCategory,
  REQUEST_CATEGORIES,
  REQUEST_CATEGORIES_FAIL,
  REQUEST_CATEGORIES_SUCCESS,
  REQUEST_SUBCATEGORIES,
  REQUEST_SUBCATEGORIES_FAIL,
  REQUEST_SUBCATEGORIES_SUCCESS,
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
    yield put(REQUEST_CATEGORIES_SUCCESS(categories));
  } catch (error) {
    yield put(REQUEST_CATEGORIES_FAIL(JSON.stringify(error)));
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
    yield put(REQUEST_SUBCATEGORIES_SUCCESS(categories));
  } catch (error) {
    yield put(REQUEST_SUBCATEGORIES_FAIL(JSON.stringify(error)));
  }
}

export default (firestore: Firestore): any[] => [
  takeLatest(REQUEST_CATEGORIES, requestCategories, firestore),
  takeLatest(REQUEST_SUBCATEGORIES, requestSubCategories, firestore),
];
