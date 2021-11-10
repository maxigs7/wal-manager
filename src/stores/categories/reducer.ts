import {
  Actions,
  OPEN_FORM,
  OPEN_FORM_DISMISS,
  OPEN_FORM_SUCCESS,
  SELECTED,
  SELECTED_TYPE,
} from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case OPEN_FORM: {
      const key = action.payload.isDeleting ? 'isOpenRemove' : 'isOpenForm';
      return {
        ...state,
        [key]: true,
        id: action.payload.id,
        selectedTypeForm: action.payload.type,
      };
    }
    case OPEN_FORM_SUCCESS: {
      const key = state.isOpenForm ? 'isOpenForm' : 'isOpenRemove';
      const selected =
        state.selectedType === state.selectedTypeForm ? action.payload : state.selected;
      return {
        ...state,
        [key]: false,
        id: undefined,
        selected: state.isOpenRemove ? undefined : selected,
        selectedTypeForm: undefined,
      };
    }
    case OPEN_FORM_DISMISS: {
      const key = state.isOpenForm ? 'isOpenForm' : 'isOpenRemove';
      return {
        ...state,
        [key]: false,
        id: undefined,
        selectedTypeForm: undefined,
      };
    }
    case SELECTED:
      return {
        ...state,
        selected: action.payload,
      };

    case SELECTED_TYPE:
      return {
        ...state,
        selectedType: action.payload,
        selected: undefined,
      };
    default:
      return state;
  }
};
