import { Category, CategoryType } from '@models';

export const SELECTED = '[CATEGORIES] Selected';
export const SELECTED_ID = '[CATEGORIES] Selected Id';
export const SELECTED_TYPE = '[CATEGORIES] Selected type';

export type Actions =
  | { type: typeof SELECTED; payload: Category }
  | { type: typeof SELECTED_ID; payload?: { id?: string; deselect?: boolean } }
  | { type: typeof SELECTED_TYPE; payload: CategoryType };

export const selected = (payload: Category): Actions => ({ type: SELECTED, payload });
export const selectedId = (payload?: { id?: string; deselect?: boolean }): Actions => ({
  type: SELECTED_ID,
  payload,
});
export const selectedType = (payload: CategoryType): Actions => ({
  type: SELECTED_TYPE,
  payload,
});
