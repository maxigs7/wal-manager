import { addMonths } from 'date-fns';

import { convertQuerystring } from '../util';
import {
  Actions,
  CHANGE_ACCOUNT,
  CHANGE_MONTH_YEAR,
  CHANGE_QUOTATION,
  FILTER_BY_CATEGORY_ID,
  FILTER_BY_CREDIT_CARD_ID,
  HIGHLIGHT_TYPE,
} from './actions';
import { IState } from './state';

export type Reducer = (state: IState, actions: Actions) => IState;

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case CHANGE_ACCOUNT: {
      return {
        ...state,
        accountCurrency: action.payload?.currency,
        accountId: action.payload?.id,
        quotation: action.payload?.currency !== 'usd' ? undefined : state.quotation,
        querystring: convertQuerystring({
          accountId: action.payload?.id as string,
          month: state.month.toString(),
          year: state.year.toString(),
        }),
      };
    }
    case CHANGE_MONTH_YEAR: {
      const date = new Date(action.payload.year, action.payload.month, 1);
      return {
        ...state,
        date,
        month: action.payload.month,
        previousMonth: addMonths(date, -1).getMonth(),
        previousYear: addMonths(date, -1).getFullYear(),
        querystring: convertQuerystring({
          accountId: state.accountId as string,
          month: action.payload.month.toString(),
          year: action.payload.year.toString(),
        }),
        year: action.payload.year,
      };
    }
    case CHANGE_QUOTATION: {
      return {
        ...state,
        quotation: action.payload,
      };
    }
    case FILTER_BY_CATEGORY_ID: {
      return {
        ...state,
        categoryId: action.payload,
      };
    }
    case FILTER_BY_CREDIT_CARD_ID: {
      return {
        ...state,
        creditCardId: action.payload,
      };
    }
    case HIGHLIGHT_TYPE: {
      return {
        ...state,
        highlightType: action.payload,
      };
    }

    default:
      return state;
  }
};
