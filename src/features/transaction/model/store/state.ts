export interface IState {
  month: number;
  year: number;
}

export interface IDispatch {
  onChangedMonth(month: number): void;
  onChangedYear(year: number): void;
}

export const initialState: IState = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};
