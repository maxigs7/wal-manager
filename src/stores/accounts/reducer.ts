import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';

import { addFailCase, addLoadingCase, addSuccessCase } from '../util';
import { ACCOUNTS_REQUEST_FAIL, ACCOUNTS_REQUEST_SUCCESS, ACCOUNTS_REQUEST } from './actions';
import { initialState, IState } from './state';

const reducer = createReducer(initialState, (builder: ActionReducerMapBuilder<IState>) => {
  addLoadingCase(builder, ACCOUNTS_REQUEST, (state: IState) => state.accounts);
  addFailCase(builder, ACCOUNTS_REQUEST_FAIL, (state: IState) => state.accounts);
  addSuccessCase(builder, ACCOUNTS_REQUEST_SUCCESS, (state: IState) => state.accounts);
});

export default reducer;
