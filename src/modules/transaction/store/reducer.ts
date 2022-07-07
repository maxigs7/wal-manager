import {
  Actions,
  CHANGE_ACCOUNT,
  CHANGE_MONTH,
  CHANGE_YEAR,
  NEXT_MONTH,
  PREVIOUS_MONTH,
} from './actions';
import { IState } from './state';

export type Reducer = (state: IState, actions: Actions) => IState;

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case CHANGE_ACCOUNT: {
      return {
        ...state,
        accountId: action.payload,
      };
    }
    case CHANGE_MONTH: {
      return {
        ...state,
        month: action.payload,
      };
    }
    case CHANGE_YEAR: {
      return {
        ...state,
        month: state.year > action.payload ? 11 : 0,
        year: action.payload,
      };
    }
    case NEXT_MONTH: {
      return {
        ...state,
        month: state.month === 11 ? 0 : state.month + 1,
        year: state.month === 11 ? state.year + 1 : state.year,
      };
    }
    case PREVIOUS_MONTH: {
      return {
        ...state,
        month: state.month === 0 ? 11 : state.month - 1,
        year: state.month === 0 ? state.year - 1 : state.year,
      };
    }
    default:
      return state;
  }
};
