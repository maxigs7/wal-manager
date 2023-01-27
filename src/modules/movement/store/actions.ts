import { IDolarsi } from '@/api';
import { Account, MovementType } from '@/models';

export const CHANGE_ACCOUNT = '[MOVEMENTS] Change Account Data';
export const CHANGE_MONTH_YEAR = '[MOVEMENTS] Change Month and Year';
export const CHANGE_QUOTATION = '[MOVEMENTS] Change Quotation';
export const FILTER_BY_CATEGORY_ID = '[MOVEMENTS][FILTER] Filter by category';
export const FILTER_BY_CREDIT_CARD_ID = '[MOVEMENTS][FILTER] Filter by credit card';
export const HIGHLIGHT_TYPE = '[MOVEMENTS] Highlight type';

export type Actions =
  | { type: typeof CHANGE_ACCOUNT; payload?: Account }
  | { type: typeof CHANGE_MONTH_YEAR; payload: { month: number; year: number } }
  | { type: typeof CHANGE_QUOTATION; payload?: IDolarsi }
  | { type: typeof FILTER_BY_CATEGORY_ID; payload?: string }
  | { type: typeof FILTER_BY_CREDIT_CARD_ID; payload?: string }
  | { type: typeof HIGHLIGHT_TYPE; payload?: MovementType };

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

export const highlightType = (payload?: MovementType): Actions => ({
  type: HIGHLIGHT_TYPE,
  payload,
});
