import { getRangeFromDate } from '@shared';

export interface IState {
  endDate: Date;
  month: number;
  startDate: Date;
  year: number;
}

export interface IDispatch {
  onChangedMonth(month: number): void;
  onChangedYear(year: number): void;
}

const currentDate = new Date();
const { endDate, startDate } = getRangeFromDate(currentDate);

export const initialState: IState = {
  endDate,
  month: currentDate.getMonth(),
  startDate,
  year: currentDate.getFullYear(),
};
