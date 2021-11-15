import { Actions, OPEN_FORM, OPEN_FORM_DISMISS, OPEN_FORM_SUCCESS } from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case OPEN_FORM: {
      const key = action.payload.isDeleting ? 'isOpenRemove' : 'isOpenForm';
      return {
        ...state,
        [key]: true,
        id: action.payload.id,
      };
    }
    case OPEN_FORM_SUCCESS: {
      const key = state.isOpenForm ? 'isOpenForm' : 'isOpenRemove';
      return {
        ...state,
        [key]: false,
        id: undefined,
      };
    }
    case OPEN_FORM_DISMISS: {
      const key = state.isOpenForm ? 'isOpenForm' : 'isOpenRemove';
      return {
        ...state,
        [key]: false,
        id: undefined,
      };
    }

    default:
      return state;
  }
};
