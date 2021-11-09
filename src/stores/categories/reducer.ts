import { Actions, SELECTED, SELECTED_ID, SELECTED_TYPE } from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    case SELECTED_ID:
      return {
        ...state,
        id: action.payload?.id,
        selected: action.payload?.deselect ? undefined : state.selected,
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
