import { IDolarsi } from '@api';
import { Account, TransactionType } from '@models';

export const CHANGE_ACCOUNT = '[TRANSACTIONS] Change Account Data';
export const CHANGE_MONTH_YEAR = '[TRANSACTIONS] Change Month and Year';
export const CHANGE_QUOTATION = '[TRANSACTIONS] Change Quotation';
export const FILTER_BY_CATEGORY_ID = '[TRANSACTIONS][FILTER] Filter by category';
export const FILTER_BY_CREDIT_CARD_ID = '[TRANSACTIONS][FILTER] Filter by credit card';
export const HIGHLIGHT_TYPE = '[TRANSACTIONS] Highlight type';
export const NEXT_MONTH = '[TRANSACTIONS] Next Month';
export const PREVIOUS_MONTH = '[TRANSACTIONS] Previous Month';

export type Actions =
  | { type: typeof CHANGE_ACCOUNT; payload?: Account }
  | { type: typeof CHANGE_MONTH_YEAR; payload: { month: number; year: number } }
  | { type: typeof CHANGE_QUOTATION; payload?: IDolarsi }
  | { type: typeof FILTER_BY_CATEGORY_ID; payload?: string }
  | { type: typeof FILTER_BY_CREDIT_CARD_ID; payload?: string }
  | { type: typeof HIGHLIGHT_TYPE; payload?: TransactionType }
  | { type: typeof NEXT_MONTH }
  | { type: typeof PREVIOUS_MONTH };

export const changeAccount = (payload?: Account): Actions => ({
  type: CHANGE_ACCOUNT,
  payload,
});

export const changeMonthYear = (payload: { month: number; year: number }): Actions => ({
  type: CHANGE_MONTH_YEAR,
  payload,
});

export const changeQuotation = (payload?: IDolarsi): Actions => ({
  type: CHANGE_QUOTATION,
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
