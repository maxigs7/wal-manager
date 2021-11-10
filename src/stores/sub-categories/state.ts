import { Category } from '@models';

export interface IState {
  id?: string;
  isOpenForm: boolean;
  isOpenRemove: boolean;
}

export interface IDispatch {
  onConfirmedForm(data: Category): void;
  onDismissForm(): void;
  onOpenForm(id?: string, isDeleting?: boolean): void;
}

export const initialState: IState = {
  isOpenForm: false,
  isOpenRemove: false,
};
