export const CHANGE_ACCOUNT = '[TRANSACTIONS] Change Account';
export const CHANGE_MONTH = '[TRANSACTIONS] Change Month';
export const CHANGE_YEAR = '[TRANSACTIONS] Change Year';
export const NEXT_MONTH = '[TRANSACTIONS] Next Month';
export const PREVIOUS_MONTH = '[TRANSACTIONS] Previous Month';

export type Actions =
  | { type: typeof CHANGE_ACCOUNT; payload: string }
  | { type: typeof CHANGE_MONTH; payload: number }
  | { type: typeof CHANGE_YEAR; payload: number }
  | { type: typeof NEXT_MONTH }
  | { type: typeof PREVIOUS_MONTH };

export const changeAccount = (payload: string): Actions => ({
  type: CHANGE_ACCOUNT,
  payload,
});

export const changeMonth = (payload: number): Actions => ({
  type: CHANGE_MONTH,
  payload,
});

export const changeYear = (payload: number): Actions => ({
  type: CHANGE_YEAR,
  payload,
});

export const nextMonth = (): Actions => ({
  type: NEXT_MONTH,
});

export const previousMonth = (): Actions => ({
  type: PREVIOUS_MONTH,
});
