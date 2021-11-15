import { CreditCard } from '@models';
import { IOpenForm } from '@stores/types';

export const OPEN_FORM = '[CREDIT_CARDS] Open Form';
export const OPEN_FORM_SUCCESS = '[CREDIT_CARDS] Open Form Success';
export const OPEN_FORM_DISMISS = '[CREDIT_CARDS] Open Form Dismiss';

export type Actions =
  | { type: typeof OPEN_FORM; payload: IOpenForm }
  | { type: typeof OPEN_FORM_DISMISS }
  | { type: typeof OPEN_FORM_SUCCESS; payload: CreditCard };

export const openForm = (payload: IOpenForm): Actions => ({
  type: OPEN_FORM,
  payload,
});
export const openFormDismiss = (): Actions => ({
  type: OPEN_FORM_DISMISS,
});
export const openFormSuccess = (payload: CreditCard): Actions => ({
  type: OPEN_FORM_SUCCESS,
  payload,
});
