import { CreditCard } from '@models';
import { IModalState } from '@stores/state';

export type IState = IModalState;

export interface IDispatch {
  onConfirmedForm(data: CreditCard): void;
  onDismissForm(): void;
  onOpenForm(cc?: CreditCard, isDeleting?: boolean): void;
}

export const initialState: IState = {
  isOpenForm: false,
  isOpenRemove: false,
};
