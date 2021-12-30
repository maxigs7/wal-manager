import { getRangeFromDate } from '@shared';

import { Actions, CHANGE_MONTH, CHANGE_YEAR } from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case CHANGE_MONTH: {
      const { endDate, startDate } = getRangeFromDate(
        new Date(state.year, action.payload, 1, 0, 0, 0),
      );
      return {
        ...state,
        endDate,
        month: action.payload,
        startDate,
      };
    }
    case CHANGE_YEAR: {
      const month = state.year > action.payload ? 11 : 0;
      const { endDate, startDate } = getRangeFromDate(new Date(action.payload, month, 1, 0, 0, 0));
      return {
        ...state,
        endDate,
        month: state.year > action.payload ? 11 : 0,
        startDate,
        year: action.payload,
      };
    }
    default:
      return state;
  }
};
