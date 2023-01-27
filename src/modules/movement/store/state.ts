import { addMonths } from 'date-fns';

import { IDolarsi } from '@api';
import { CategoryLookup } from '@m/category';
import { Account, CreditCard, Currency, MovementType } from '@models';

export interface IState {
  accountCurrency?: Currency;
  accountId?: string;
  categoryId?: string;
  creditCardId?: string;
  date: Date;
  highlightType?: MovementType;
  month: number;
  previousMonth: number;
  previousYear: number;
  querystring?: string;
  quotation?: IDolarsi;
  year: number;
}

export interface IDispatch {
  // getQueryParameters(): string;
  onChangedAccount(account?: Partial<Account>): void;
  onChangedMonthYear(month: number, year: number): void;
  onChangedQuotation(quotation?: IDolarsi): void;
  onFilterByCategory(category?: CategoryLookup): void;
  onFilterByCreditCard(creditCard?: CreditCard): void;
  onHighlightType(type?: MovementType): void;
}

const currentDate = new Date();

export const initialState: IState = {
  date: currentDate,
  month: currentDate.getMonth(),
  previousMonth: addMonths(currentDate, -1).getMonth(),
  previousYear: addMonths(currentDate, -1).getFullYear(),
  year: currentDate.getFullYear(),
};

export type Store = [IState, IDispatch];
