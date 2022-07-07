export interface IState {
  accountId: string;
  categoryId?: string;
  creditCardId?: string;
  month: number;
  year: number;
}

interface IExtendedState extends IState {
  endDate: Date;
  startDate: Date;
}

export interface IDispatch {
  onChangedAccount(id: string): void;
  onChangedMonth(month: number): void;
  onChangedYear(year: number): void;
  onFilterByCategory(id: string): void;
  onFilterByCreditCard(id: string): void;
  onNextMonth(): void;
  onPreviousMonth(): void;
}

const currentDate = new Date();

export const initialState: IState = {
  accountId: '',
  month: currentDate.getMonth(),
  year: currentDate.getFullYear(),
};

export type Store = [IExtendedState, IDispatch];
