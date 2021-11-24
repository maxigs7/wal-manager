import {
  Actions,
  CHANGE_MONTH,
  CHANGE_YEAR,
  OPEN_FORM,
  OPEN_FORM_DISMISS,
  OPEN_FORM_SUCCESS,
} from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case CHANGE_MONTH: {
      return {
        ...state,
        month: action.payload,
      };
    }
    case CHANGE_YEAR: {
      return {
        ...state,
        year: action.payload,
      };
    }
    case OPEN_FORM: {
      const key = action.payload.isDeleting ? 'isOpenRemove' : 'isOpenForm';
      return {
        ...state,
        [key]: true,
        id: action.payload.id,
        selectedType: action.payload.type,
      };
    }
    case OPEN_FORM_SUCCESS: {
      const key = state.isOpenForm ? 'isOpenForm' : 'isOpenRemove';
      return {
        ...state,
        [key]: false,
        id: undefined,
        selectedType: undefined,
      };
    }
    case OPEN_FORM_DISMISS: {
      const key = state.isOpenForm ? 'isOpenForm' : 'isOpenRemove';
      return {
        ...state,
        [key]: false,
        id: undefined,
        selectedType: undefined,
      };
    }
    default:
      return state;
  }
};
