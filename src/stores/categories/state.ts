import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

import { IAsyncState } from '../state';

export const initialState: IState = {
  categories: {
    data: [],
    isLoading: false,
    status: 'idle',
  },
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
  category?: IAsyncState<Category>;
  selected?: Category;
  subCategories: IAsyncState<Category[]>;
  type: CategoryType;
}
