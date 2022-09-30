import {
  Actions,
  CHANGE_ACCOUNT,
  CHANGE_MONTH_YEAR,
  CHANGE_QUOTATION,
  FILTER_BY_CATEGORY_ID,
  FILTER_BY_CREDIT_CARD_ID,
  HIGHLIGHT_TYPE,
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
        accountCurrency: action.payload?.currency,
        accountId: action.payload?.id,
        quotation: action.payload?.currency !== 'usd' ? undefined : state.quotation,
      };
    }
    case CHANGE_MONTH_YEAR: {
      return {
        ...state,
        month: action.payload.month,
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
