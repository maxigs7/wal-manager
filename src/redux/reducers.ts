import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers, Reducer } from 'redux';

import counter from '@redux/slices/counter';

const rootReducer = combineReducers({ counter });

export type RootState = ReturnType<typeof rootReducer>;

const reducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === HYDRATE) {
    /* client state will be overwritten
     * by server or static state hydation.
     * Implement state preservation as needed.
     * see: https://github.com/kirill-konshin/next-redux-wrapper#server-and-client-state-separation
     */
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
};

export default reducer;
