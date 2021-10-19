import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';

import { defaultAsync } from '../state';
import { addFailCase, addLoadingCase, addSuccessCase } from '../util';
import {
  CREDIT_CARD_CREATE_REQUEST_FAIL,
  CREDIT_CARD_CREATE_REQUEST_SUCCESS,
  CREDIT_CARD_CREATE_REQUEST,
  CREDIT_CARD_REMOVE_REQUEST_FAIL,
  CREDIT_CARD_REMOVE_REQUEST_SUCCESS,
  CREDIT_CARD_REMOVE_REQUEST,
  CREDIT_CARD_REQUEST_FAIL,
  CREDIT_CARD_REQUEST_SUCCESS,
  CREDIT_CARD_REQUEST,
  CREDIT_CARD_RESET,
  CREDIT_CARD_SELECTED,
  CREDIT_CARD_UPDATE_REQUEST_FAIL,
  CREDIT_CARD_UPDATE_REQUEST_SUCCESS,
  CREDIT_CARD_UPDATE_REQUEST,
  CREDIT_CARDS_REQUEST_FAIL,
  CREDIT_CARDS_REQUEST_SUCCESS,
  CREDIT_CARDS_REQUEST,
} from './actions';
import { initialState, IState } from './state';

const reducer = createReducer(initialState, (builder: ActionReducerMapBuilder<IState>) => {
  /******************************
   * LIST
   */
  addLoadingCase(builder, CREDIT_CARDS_REQUEST, (state: IState) => state.list);
  addFailCase(builder, CREDIT_CARDS_REQUEST_FAIL, (state: IState) => state.list);
  addSuccessCase(builder, CREDIT_CARDS_REQUEST_SUCCESS, (state: IState) => state.list);
  /******************************
   * GET
   */
  addLoadingCase(builder, CREDIT_CARD_REQUEST, (state: IState) => state.creditCard);
  addFailCase(builder, CREDIT_CARD_REQUEST_FAIL, (state: IState) => state.creditCard);
  addSuccessCase(builder, CREDIT_CARD_REQUEST_SUCCESS, (state: IState) => state.creditCard);
  /******************************
   * CREATE/UPDATE
   */
  addLoadingCase(builder, CREDIT_CARD_CREATE_REQUEST, (state: IState) => state.formSubmission);
  addFailCase(builder, CREDIT_CARD_CREATE_REQUEST_FAIL, (state: IState) => state.formSubmission);
  addSuccessCase(
    builder,
    CREDIT_CARD_CREATE_REQUEST_SUCCESS,
    (state: IState) => state.formSubmission,
  );
  addLoadingCase(builder, CREDIT_CARD_UPDATE_REQUEST, (state: IState) => state.formSubmission);
  addFailCase(builder, CREDIT_CARD_UPDATE_REQUEST_FAIL, (state: IState) => state.formSubmission);
  addSuccessCase(
    builder,
    CREDIT_CARD_UPDATE_REQUEST_SUCCESS,
    (state: IState) => state.formSubmission,
  );
  /******************************
   * REMOVE
   */
  addLoadingCase(builder, CREDIT_CARD_REMOVE_REQUEST, (state: IState) => state.formSubmission);
  addFailCase(builder, CREDIT_CARD_REMOVE_REQUEST_FAIL, (state: IState) => state.formSubmission);
  addSuccessCase(
    builder,
    CREDIT_CARD_REMOVE_REQUEST_SUCCESS,
    (state: IState) => state.formSubmission,
  );

  builder
    .addCase(CREDIT_CARD_RESET, (state) => {
      state.formSubmission = { ...defaultAsync };
      state.creditCard = { ...defaultAsync };
      state.selected = undefined;
    })
    .addCase(CREDIT_CARD_SELECTED, (state, action) => {
      state.selected = action.payload;
    });
});

export default reducer;
