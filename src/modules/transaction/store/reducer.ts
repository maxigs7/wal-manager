import { Actions, CHANGE_ACCOUNT, CHANGE_MONTH, CHANGE_YEAR } from './actions';
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
    default:
      return state;
  }
};
