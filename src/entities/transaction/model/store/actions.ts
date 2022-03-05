export const CHANGE_MONTH = '[TRANSACTIONS] Change Month';
export const CHANGE_YEAR = '[TRANSACTIONS] Change Year';

export type Actions =
  | { type: typeof CHANGE_MONTH; payload: number }
  | { type: typeof CHANGE_YEAR; payload: number };

export const changeMonth = (payload: number): Actions => ({
  type: CHANGE_MONTH,
  payload,
});
export const changeYear = (payload: number): Actions => ({
  type: CHANGE_YEAR,
  payload,
});
