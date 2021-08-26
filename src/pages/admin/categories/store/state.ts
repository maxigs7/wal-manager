import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

export interface IState {
  categoryId?: string;
  selected?: Category;
  selectedType: CategoryType;
}

export const initialState = (): IState => ({
  selectedType: CategoryType.Expense,
});
