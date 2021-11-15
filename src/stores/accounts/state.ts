import { Account } from '@models';
import { IModalState } from '@stores/state';

export type IState = IModalState;

export interface IDispatch {
  onConfirmedForm(data: Account): void;
  onDismissForm(): void;
  onOpenForm(account?: Account, isDeleting?: boolean): void;
}

export const initialState: IState = {
  isOpenForm: false,
  isOpenRemove: false,
};
