import { IDolarsi } from '@api';
import { Account, Currency, TransactionType } from '@models';

export interface IState {
  accountCurrency?: Currency;
  accountId?: string;
  categoryId?: string;
  creditCardId?: string;
  highlightType?: TransactionType;
  month: number;
  quotation?: IDolarsi;
  year: number;
}

interface IExtendedState extends IState {
  endDate: Date;
  startDate: Date;
}

export interface IDispatch {
  onChangedAccount(account?: Partial<Account>): void;
  onChangedMonthYear(month: number, year: number): void;
  onChangedQuotation(quotation?: IDolarsi): void;
  onFilterByCategory(id: string): void;
  onFilterByCreditCard(id: string): void;
  onHighlightType(type?: TransactionType): void;
  onNextMonth(): void;
  onPreviousMonth(): void;
}

const currentDate = new Date();

export const initialState: IState = {
  month: currentDate.getMonth(),
  year: currentDate.getFullYear(),
};

export type Store = [IExtendedState, IDispatch];
