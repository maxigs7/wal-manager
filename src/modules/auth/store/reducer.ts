import { Actions, AUTH_END, AUTH_START } from './actions';
import { State } from './state';

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        user: action.payload,
      };
    case AUTH_END:
      return {
        ...state,
        initializing: false,
      };
    default:
      return state;
  }
};
