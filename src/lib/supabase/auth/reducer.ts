import { Actions, AUTH_START } from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        initializing: false,
        user: action.payload,
      };
    default:
      return state;
  }
};
