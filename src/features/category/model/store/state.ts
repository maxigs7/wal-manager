import { Category } from '@entities';

export interface IState {
  selected?: Category;
}

export interface IDispatch {
  onSelected(category: Category): void;
}

export const initialState: IState = {};
