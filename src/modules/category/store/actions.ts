import { Category } from '@models';

export const SELECTED = '[CATEGORIES] Selected';

export type Actions = { type: typeof SELECTED; payload: Category };

export const selected = (payload: Category): Actions => ({ type: SELECTED, payload });
