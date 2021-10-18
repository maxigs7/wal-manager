import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';

import { defaultAsync } from '../state';
import { addFailCase, addLoadingCase, addSuccessCase } from '../util';
import {
  ACCOUNT_CREATE_REQUEST_FAIL,
  ACCOUNT_CREATE_REQUEST_SUCCESS,
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_REQUEST_FAIL,
  ACCOUNT_REQUEST_SUCCESS,
  ACCOUNT_REQUEST,
  ACCOUNT_RESET,
  ACCOUNT_SELECTED,
  ACCOUNT_UPDATE_REQUEST_FAIL,
  ACCOUNT_UPDATE_REQUEST_SUCCESS,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNTS_REQUEST_FAIL,
  ACCOUNTS_REQUEST_SUCCESS,
  ACCOUNTS_REQUEST,
  ACCOUNT_REMOVE_REQUEST,
  ACCOUNT_REMOVE_REQUEST_FAIL,
  ACCOUNT_REMOVE_REQUEST_SUCCESS,
} from './actions';
import { initialState, IState } from './state';

const reducer = createReducer(initialState, (builder: ActionReducerMapBuilder<IState>) => {
  /******************************
   * LIST
   */
  addLoadingCase(builder, ACCOUNTS_REQUEST, (state: IState) => state.list);
  addFailCase(builder, ACCOUNTS_REQUEST_FAIL, (state: IState) => state.list);
  addSuccessCase(builder, ACCOUNTS_REQUEST_SUCCESS, (state: IState) => state.list);
  /******************************
   * GET
   */
  addLoadingCase(builder, ACCOUNT_REQUEST, (state: IState) => state.account);
  addFailCase(builder, ACCOUNT_REQUEST_FAIL, (state: IState) => state.account);
  addSuccessCase(builder, ACCOUNT_REQUEST_SUCCESS, (state: IState) => state.account);
  /******************************
   * CREATE/UPDATE
   */
  addLoadingCase(builder, ACCOUNT_CREATE_REQUEST, (state: IState) => state.formSubmission);
  addFailCase(builder, ACCOUNT_CREATE_REQUEST_FAIL, (state: IState) => state.formSubmission);
  addSuccessCase(builder, ACCOUNT_CREATE_REQUEST_SUCCESS, (state: IState) => state.formSubmission);
  addLoadingCase(builder, ACCOUNT_UPDATE_REQUEST, (state: IState) => state.formSubmission);
  addFailCase(builder, ACCOUNT_UPDATE_REQUEST_FAIL, (state: IState) => state.formSubmission);
  addSuccessCase(builder, ACCOUNT_UPDATE_REQUEST_SUCCESS, (state: IState) => state.formSubmission);
  /******************************
   * REMOVE
   */
  addLoadingCase(builder, ACCOUNT_REMOVE_REQUEST, (state: IState) => state.formSubmission);
  addFailCase(builder, ACCOUNT_REMOVE_REQUEST_FAIL, (state: IState) => state.formSubmission);
  addSuccessCase(builder, ACCOUNT_REMOVE_REQUEST_SUCCESS, (state: IState) => state.formSubmission);

  builder
    .addCase(ACCOUNT_RESET, (state) => {
      state.formSubmission = { ...defaultAsync };
      state.account = { ...defaultAsync };
      state.selected = undefined;
    })
    .addCase(ACCOUNT_SELECTED, (state, action) => {
      state.selected = action.payload;
    });
});

export default reducer;
