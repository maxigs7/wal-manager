export interface IState {
  month: number;
  year: number;
}

interface IExtendedState extends IState {
  endDate: Date;
  startDate: Date;
}

export interface IDispatch {
  onChangedMonth(month: number): void;
  onChangedYear(year: number): void;
}

const currentDate = new Date();

export const initialState: IState = {
  month: currentDate.getMonth(),
  year: currentDate.getFullYear(),
};

export type Store = [IExtendedState, IDispatch];
