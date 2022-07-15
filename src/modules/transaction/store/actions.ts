import { IDolarsi } from '@api';
import { Account, TransactionType } from '@models';

export const CHANGE_ACCOUNT = '[TRANSACTIONS] Change Account';
export const CHANGE_MONTH = '[TRANSACTIONS] Change Month';
export const CHANGE_QUOTATION = '[TRANSACTIONS] Change Quotation';
export const CHANGE_YEAR = '[TRANSACTIONS] Change Year';
export const FILTER_BY_CATEGORY_ID = '[TRANSACTIONS][FILTER] Filter by category';
export const FILTER_BY_CREDIT_CARD_ID = '[TRANSACTIONS][FILTER] Filter by credit card';
export const HIGHLIGHT_TYPE = '[TRANSACTIONS] Highlight type';
export const NEXT_MONTH = '[TRANSACTIONS] Next Month';
export const PREVIOUS_MONTH = '[TRANSACTIONS] Previous Month';

export type Actions =
  | { type: typeof CHANGE_ACCOUNT; payload?: Account }
  | { type: typeof CHANGE_MONTH; payload: number }
  | { type: typeof CHANGE_QUOTATION; payload?: IDolarsi }
  | { type: typeof CHANGE_YEAR; payload: number }
  | { type: typeof FILTER_BY_CATEGORY_ID; payload?: string }
  | { type: typeof FILTER_BY_CREDIT_CARD_ID; payload?: string }
  | { type: typeof HIGHLIGHT_TYPE; payload?: TransactionType }
  | { type: typeof NEXT_MONTH }
  | { type: typeof PREVIOUS_MONTH };

export const changeAccount = (payload?: Account): Actions => ({
  type: CHANGE_ACCOUNT,
  payload,
});

export const changeMonth = (payload: number): Actions => ({
  type: CHANGE_MONTH,
  payload,
});

export const changeQuotation = (payload?: IDolarsi): Actions => ({
  type: CHANGE_QUOTATION,
  payload,
});

export const changeYear = (payload: number): Actions => ({
  type: CHANGE_YEAR,
  payload,
});

export const filterByCategory = (payload?: string): Actions => ({
  type: FILTER_BY_CATEGORY_ID,
  payload,
});

export const filterByCreditCard = (payload?: string): Actions => ({
  type: FILTER_BY_CREDIT_CARD_ID,
  payload,
});

export const highlightType = (payload?: TransactionType): Actions => ({
  type: HIGHLIGHT_TYPE,
  payload,
});

export const nextMonth = (): Actions => ({
  type: NEXT_MONTH,
});

export const previousMonth = (): Actions => ({
  type: PREVIOUS_MONTH,
});
