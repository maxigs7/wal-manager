import { Category } from '@models';

export const OPEN_FORM = '[CATEGORIES] Open Form';
export const OPEN_FORM_SUCCESS = '[CATEGORIES] Open Form Success';
export const OPEN_FORM_DISMISS = '[CATEGORIES] Open Form Dismiss';

export type Actions =
  | { type: typeof OPEN_FORM; payload: { id?: string; isDeleting: boolean } }
  | { type: typeof OPEN_FORM_DISMISS }
  | { type: typeof OPEN_FORM_SUCCESS; payload: Category };

export const openForm = (payload: { id?: string; isDeleting: boolean }): Actions => ({
  type: OPEN_FORM,
  payload,
});
export const openFormDismiss = (): Actions => ({
  type: OPEN_FORM_DISMISS,
});
export const openFormSuccess = (payload: Category): Actions => ({
  type: OPEN_FORM_SUCCESS,
  payload,
});
