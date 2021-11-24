import { Transaction, TransactionType } from '@models';

export const CHANGE_MONTH = '[TRANSACTIONS] Change Month';
export const CHANGE_YEAR = '[TRANSACTIONS] Change Year';
export const OPEN_FORM = '[TRANSACTIONS] Open Form';
export const OPEN_FORM_SUCCESS = '[TRANSACTIONS] Open Form Success';
export const OPEN_FORM_DISMISS = '[TRANSACTIONS] Open Form Dismiss';

export type Actions =
  | { type: typeof CHANGE_MONTH; payload: number }
  | { type: typeof CHANGE_YEAR; payload: number }
  | { type: typeof OPEN_FORM; payload: { id?: string; isDeleting: boolean; type: TransactionType } }
  | { type: typeof OPEN_FORM_DISMISS }
  | { type: typeof OPEN_FORM_SUCCESS; payload: Transaction };

export const changeMonth = (payload: number): Actions => ({
  type: CHANGE_MONTH,
  payload,
});
export const changeYear = (payload: number): Actions => ({
  type: CHANGE_YEAR,
  payload,
});
export const openForm = (payload: {
  id?: string;
  isDeleting: boolean;
  type: TransactionType;
}): Actions => ({
  type: OPEN_FORM,
  payload,
});
export const openFormDismiss = (): Actions => ({
  type: OPEN_FORM_DISMISS,
});
export const openFormSuccess = (payload: Transaction): Actions => ({
  type: OPEN_FORM_SUCCESS,
  payload,
});
