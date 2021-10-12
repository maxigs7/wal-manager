import { Category } from '@app/models/categories';
import { CategoryType } from '@app/models/common';

import { defaultAsync, IAsyncState } from '../state';

export const initialState: IState = {
  categories: {
    ...defaultAsync,
    data: [],
  },
  categoryAction: { ...defaultAsync },
  category: { ...defaultAsync },
  selected: undefined,
  subCategories: {
    data: [],
    isLoading: false,
    status: 'idle',
  },
  type: CategoryType.Expense,
};

export interface IState {
  categories: IAsyncState<Category[]>;
  categoryAction: IAsyncState<string>;
  category: IAsyncState<Category>;
  selected?: Category;
  subCategories: IAsyncState<Category[]>;
  type: CategoryType;
}
