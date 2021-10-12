import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

import { RootState } from '..';
import { IAsyncState } from '../state';

export const selectCategories = (state: RootState): IAsyncState<Category[]> =>
  state.categories.categories;

export const selectSubCategories = (state: RootState): IAsyncState<Category[]> =>
  state.categories.subCategories;

export const selectSelectedCategory = (state: RootState): Category | undefined =>
  state.categories.selected;

export const selectSelectedType = (state: RootState): CategoryType | undefined =>
  state.categories.type;