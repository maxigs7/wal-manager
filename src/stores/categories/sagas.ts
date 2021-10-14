import { orderBy, where } from '@firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';

import { Category } from '@app/models/categories';
import { CategoryType } from '@app/models/common';
import { IUow } from '@app/models/uow';

import { selectUserId } from '../auth';
import {
  CATEGORIES_REQUEST_FAIL,
  CATEGORIES_REQUEST_REFRESH,
  CATEGORIES_REQUEST_SUCCESS,
  CATEGORIES_REQUEST,
  CATEGORY_CREATE_REQUEST_FAIL,
  CATEGORY_CREATE_REQUEST_SUCCESS,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_REMOVE_REQUEST_FAIL,
  CATEGORY_REMOVE_REQUEST_SUCCESS,
  CATEGORY_REMOVE_REQUEST,
  CATEGORY_REQUEST_FAIL,
  CATEGORY_REQUEST_SUCCESS,
  CATEGORY_REQUEST,
  CATEGORY_SELECTED_BY_ID,
  CATEGORY_UPDATE_REQUEST_FAIL,
  CATEGORY_UPDATE_REQUEST_SUCCESS,
  CATEGORY_UPDATE_REQUEST,
  IRequestCategory,
  IRequestSubCategory,
  SUBCATEGORIES_REQUEST_FAIL,
  SUBCATEGORIES_REQUEST_SUCCESS,
  SUBCATEGORIES_REQUEST,
} from './actions';
import { selectSelectedType } from './selectors';

function* requestCategories(uow: IUow, action: PayloadAction<IRequestCategory>) {
  try {
    const { categories: repo } = uow;
    const userId: string = yield select(selectUserId);
    const data: Category[] = yield call(
      repo.getAll,
      where('categoryType', '==', action.payload.categoryType),
      where('userId', '==', userId),
      where('parentId', '==', null),
      orderBy('name', 'asc'),
    );
    yield put(CATEGORIES_REQUEST_SUCCESS(data));
  } catch (error) {
    yield put(CATEGORIES_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* refreshCategories(action: PayloadAction<string | undefined>) {
  try {
    const categoryType: CategoryType = yield select(selectSelectedType);
    yield put(CATEGORIES_REQUEST({ categoryType }));
    if (action.payload) {
      yield take(CATEGORIES_REQUEST_SUCCESS.type);
      yield put(CATEGORY_SELECTED_BY_ID(action.payload));
    }
  } catch (error) {
    yield put(CATEGORIES_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* requestSubCategories(uow: IUow, action: PayloadAction<IRequestSubCategory>) {
  try {
    const { categories: repo } = uow;
    const userId: string = yield select(selectUserId);
    const data: Category[] = yield call(
      repo.getAll,
      where('parentId', '==', action.payload.categoryId),
      where('userId', '==', userId),
      where('parentId', '==', null),
      orderBy('name', 'asc'),
    );
    yield put(SUBCATEGORIES_REQUEST_SUCCESS(data));
  } catch (error) {
    yield put(SUBCATEGORIES_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* requestCategory(uow: IUow, action: PayloadAction<string>) {
  try {
    const { categories: repo } = uow;
    const data: Category | null = yield call(repo.getById, action.payload);
    if (!data) {
      yield put(CATEGORY_REQUEST_FAIL('Category Not found'));
      return;
    }
    yield put(CATEGORY_REQUEST_SUCCESS(data));
  } catch (error) {
    yield put(CATEGORY_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* createCategory(uow: IUow, action: PayloadAction<Category>) {
  try {
    const { categories: repo } = uow;
    const id: string = yield call(repo.create, action.payload);
    yield put(CATEGORY_CREATE_REQUEST_SUCCESS(id));
  } catch (error) {
    yield put(CATEGORY_CREATE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* updateCategory(uow: IUow, action: PayloadAction<Category>) {
  try {
    const { categories: repo } = uow;
    yield call(repo.update, action.payload.id, action.payload);
    yield put(CATEGORY_UPDATE_REQUEST_SUCCESS());
  } catch (error) {
    yield put(CATEGORY_UPDATE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

function* removeCategory(uow: IUow, action: PayloadAction<string>) {
  try {
    const { categories: repo } = uow;
    yield call(repo.remove, action.payload);
    yield put(CATEGORY_REMOVE_REQUEST_SUCCESS());
  } catch (error) {
    yield put(CATEGORY_REMOVE_REQUEST_FAIL(JSON.stringify(error)));
  }
}

export default (uow: IUow): any[] => [
  takeLatest(CATEGORIES_REQUEST, requestCategories, uow),
  takeLatest(CATEGORIES_REQUEST_REFRESH, refreshCategories),
  takeLatest(CATEGORY_CREATE_REQUEST, createCategory, uow),
  takeLatest(CATEGORY_REMOVE_REQUEST, removeCategory, uow),
  takeLatest(CATEGORY_REQUEST, requestCategory, uow),
  takeLatest(CATEGORY_UPDATE_REQUEST, updateCategory, uow),
  takeLatest(SUBCATEGORIES_REQUEST, requestSubCategories, uow),
];
