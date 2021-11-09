import { Category } from '@models';
import { CategoryType } from '@models/common';
import { IModalDispatch } from '@stores/state';

export interface IState {
  id?: string;
  isOpenForm: boolean;
  isOpenRemove: boolean;
  selectedType: CategoryType;
  selected?: Category;
}

export interface IDispatch {
  formModal: IModalDispatch;
  onSelected(category: Category): void;
  onSelectedType(type: CategoryType): void;
  removeModal: IModalDispatch;
}

export const initialState: IState = {
  isOpenForm: false,
  isOpenRemove: false,
  selectedType: CategoryType.Expense,
};
