import { Actions, SELECTED } from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case SELECTED:
      return {
        ...state,
        selected: action.payload,
      };

    default:
      return state;
  }
};
