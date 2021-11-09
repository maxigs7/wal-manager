import { Action, AUTH_INIT } from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case AUTH_INIT:
      return {
        ...state,
        initializing: action.payload.initializing,
        user: action.payload.user,
        session: action.payload.session,
      };
    default:
      return state;
  }
};
