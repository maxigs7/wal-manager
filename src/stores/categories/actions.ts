import { Category, CategoryType } from '@models';

export const SELECTED = '[CATEGORIES] Selected';
export const SELECTED_TYPE = '[CATEGORIES] Selected type';
export const OPEN_FORM = '[CATEGORIES] Open Form';
export const OPEN_FORM_SUCCESS = '[CATEGORIES] Open Form Success';
export const OPEN_FORM_DISMISS = '[CATEGORIES] Open Form Dismiss';

export type Actions =
  | { type: typeof OPEN_FORM; payload: { id?: string; type: CategoryType; isDeleting: boolean } }
  | { type: typeof OPEN_FORM_DISMISS }
  | { type: typeof OPEN_FORM_SUCCESS; payload: Category }
  | { type: typeof SELECTED; payload: Category }
  | { type: typeof SELECTED_TYPE; payload: CategoryType };

export const openForm = (payload: {
  id?: string;
  type: CategoryType;
  isDeleting: boolean;
}): Actions => ({
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
export const selected = (payload: Category): Actions => ({ type: SELECTED, payload });
export const selectedType = (payload: CategoryType): Actions => ({
  type: SELECTED_TYPE,
  payload,
});
