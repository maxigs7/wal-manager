import { Category } from '@models';
import { CategoryType } from '@models/common';

export interface IState {
  id?: string;
  isOpenForm: boolean;
  isOpenRemove: boolean;
  selectedType: CategoryType;
  selectedTypeForm?: CategoryType;
  selected?: Category;
}

export interface IDispatch {
  onConfirmedForm(data: Category): void;
  onDismissForm(): void;
  onOpenForm(type: CategoryType, id?: string, isDeleting?: boolean): void;
  onSelected(category: Category): void;
  onSelectedType(type: CategoryType): void;
}

export const initialState: IState = {
  isOpenForm: false,
  isOpenRemove: false,
  selectedType: CategoryType.Expense,
};
