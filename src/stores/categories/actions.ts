import { createAction } from '@reduxjs/toolkit';

import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

export interface IRequestCategory {
  categoryType: CategoryType;
  userId: string;
}

export interface IRequestSubCategory {
  categoryId: string;
  userId: string;
}

export const REQUEST_CATEGORIES = createAction<IRequestCategory>('CATEGORIES/REQUEST');
export const REQUEST_CATEGORIES_FAIL = createAction<string>('CATEGORIES/REQUEST_FAIL');
export const REQUEST_CATEGORIES_SUCCESS = createAction<Category[]>('CATEGORIES/REQUEST_SUCCESS');

export const REQUEST_SUBCATEGORIES = createAction<IRequestSubCategory>(
  'CATEGORIES/SUBCATEGORIES/REQUEST',
);
export const REQUEST_SUBCATEGORIES_FAIL = createAction<string>(
  'CATEGORIES/SUBCATEGORIES/REQUEST_FAIL',
);
export const REQUEST_SUBCATEGORIES_SUCCESS = createAction<Category[]>(
  'CATEGORIES/SUBCATEGORIES/REQUEST_SUCCESS',
);

export const SELECT_CATEGORY = createAction<Category>('CATEGORIES/SELECT_CATEGORY');
export const SELECT_CATEGORY_TYPE = createAction<CategoryType>('CATEGORIES/SELECT_TYPE');

export type IActions = typeof SELECT_CATEGORY | typeof SELECT_CATEGORY_TYPE;
