import { createAction } from '@reduxjs/toolkit';

import { Category } from '@app/models/categories';
import { CategoryType } from '@app/models/common';

import { createAsyncAction } from '../actions';

export interface IRequestCategory {
  categoryType: CategoryType;
}

export interface IRequestSubCategory {
  categoryId: string;
}

/******************************
 * LIST
 */
const CATEGORIES = createAsyncAction<IRequestCategory, string, Category[]>('CATEGORIES');
export const CATEGORIES_REQUEST = CATEGORIES.REQUEST;
export const CATEGORIES_REQUEST_REFRESH = createAction<string | undefined>(
  'CATEGORIES/REQUEST_REFRESH',
);
export const CATEGORIES_REQUEST_FAIL = CATEGORIES.FAIL;
export const CATEGORIES_REQUEST_SUCCESS = CATEGORIES.SUCCESS;

/******************************
 * GET
 */
const CATEGORY = createAsyncAction<string, string, Category>('CATEGORY');
export const CATEGORY_REQUEST = CATEGORY.REQUEST;
export const CATEGORY_REQUEST_FAIL = CATEGORY.FAIL;
export const CATEGORY_REQUEST_SUCCESS = CATEGORY.SUCCESS;

/******************************
 * CREATE
 */
const CATEGORY_CREATE = createAsyncAction<Category, string, string>('CATEGORY/CREATE');
export const CATEGORY_CREATE_REQUEST = CATEGORY_CREATE.REQUEST;
export const CATEGORY_CREATE_REQUEST_FAIL = CATEGORY_CREATE.FAIL;
export const CATEGORY_CREATE_REQUEST_SUCCESS = CATEGORY_CREATE.SUCCESS;

/******************************
 * UPDATE
 */
const CATEGORY_UPDATE = createAsyncAction<Category, string, undefined>('CATEGORY/UPDATE');
export const CATEGORY_UPDATE_REQUEST = CATEGORY_UPDATE.REQUEST;
export const CATEGORY_UPDATE_REQUEST_FAIL = CATEGORY_UPDATE.FAIL;
export const CATEGORY_UPDATE_REQUEST_SUCCESS = CATEGORY_UPDATE.SUCCESS;

/******************************
 * REMOVE
 */
const CATEGORY_REMOVE = createAsyncAction<string, string, undefined>('CATEGORY/REMOVE');
export const CATEGORY_REMOVE_REQUEST = CATEGORY_REMOVE.REQUEST;
export const CATEGORY_REMOVE_REQUEST_FAIL = CATEGORY_REMOVE.FAIL;
export const CATEGORY_REMOVE_REQUEST_SUCCESS = CATEGORY_UPDATE.SUCCESS;

/******************************
 * OTHERS
 */
export const CATEGORY_RESET = createAction('CATEGORY/RESET');
export const CATEGORY_SELECTED = createAction<Category>('CATEGORY/SELECTED');
export const CATEGORY_SELECTED_BY_ID = createAction<string>('CATEGORY/SELECTED_BY_ID');
export const CATEGORY_TYPE_SELECTED = createAction<CategoryType>('CATEGORY/TYPE/SELECTED');

/******************************
 * SUB LISTS
 */
const SUBCATEGORIES = createAsyncAction<IRequestSubCategory, string, Category[]>('SUBCATEGORIES');
export const SUBCATEGORIES_REQUEST = SUBCATEGORIES.REQUEST;
export const SUBCATEGORIES_REQUEST_FAIL = SUBCATEGORIES.FAIL;
export const SUBCATEGORIES_REQUEST_SUCCESS = SUBCATEGORIES.SUCCESS;
