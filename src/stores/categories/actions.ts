import { createAction } from '@reduxjs/toolkit';

import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

import { createAsyncAction } from '../actions';

export interface IRequestCategory {
  categoryType: CategoryType;
  userId: string;
}

export interface IRequestSubCategory {
  categoryId: string;
  userId: string;
}

const CATEGORIES = createAsyncAction<IRequestCategory, string, Category[]>('CATEGORIES');
export const REQUEST_CATEGORIES = CATEGORIES.REQUEST;
export const REQUEST_CATEGORIES_FAIL = CATEGORIES.FAIL;
export const REQUEST_CATEGORIES_SUCCESS = CATEGORIES.SUCCESS;

const SUBCATEGORIES = createAsyncAction<IRequestSubCategory, string, Category[]>('SUBCATEGORIES');
export const REQUEST_SUBCATEGORIES = SUBCATEGORIES.REQUEST;
export const REQUEST_SUBCATEGORIES_FAIL = SUBCATEGORIES.FAIL;
export const REQUEST_SUBCATEGORIES_SUCCESS = SUBCATEGORIES.SUCCESS;

const CATEGORY = createAsyncAction<string, string, Category>('CATEGORY');
export const REQUEST_CATEGORY = CATEGORY.REQUEST;
export const REQUEST_CATEGORY_FAIL = CATEGORY.FAIL;
export const REQUEST_CATEGORY_SUCCESS = CATEGORY.SUCCESS;

export const SELECT_CATEGORY = createAction<Category>('CATEGORIES/SELECT_CATEGORY');
export const SELECT_CATEGORY_TYPE = createAction<CategoryType>('CATEGORIES/SELECT_TYPE');
