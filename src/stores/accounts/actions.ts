import { Account } from '@models';
import { IOpenForm } from '@stores/types';

export const OPEN_FORM = '[ACCOUNTS] Open Form';
export const OPEN_FORM_SUCCESS = '[ACCOUNTS] Open Form Success';
export const OPEN_FORM_DISMISS = '[ACCOUNTS] Open Form Dismiss';

export type Actions =
  | { type: typeof OPEN_FORM; payload: IOpenForm }
  | { type: typeof OPEN_FORM_DISMISS }
  | { type: typeof OPEN_FORM_SUCCESS; payload: Account };

export const openForm = (payload: IOpenForm): Actions => ({
  type: OPEN_FORM,
  payload,
});
export const openFormDismiss = (): Actions => ({
  type: OPEN_FORM_DISMISS,
});
export const openFormSuccess = (payload: Account): Actions => ({
  type: OPEN_FORM_SUCCESS,
  payload,
});
