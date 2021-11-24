import { Transaction, TransactionType } from '@models';

export interface IState {
  id?: string;
  isOpenForm: boolean;
  isOpenRemove: boolean;
  month: number;
  selectedType?: TransactionType;
  year: number;
}

export interface IDispatch {
  onChangedMonth(month: number): void;
  onChangedYear(year: number): void;
  onConfirmedForm(data: Transaction): void;
  onDismissForm(): void;
  onOpenForm(type: TransactionType, id?: string, isDeleting?: boolean): void;
}

export const initialState: IState = {
  isOpenForm: false,
  isOpenRemove: false,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};
