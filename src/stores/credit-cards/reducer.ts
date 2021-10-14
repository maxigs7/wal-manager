import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';

import { defaultAsync } from '../state';
import { addFailCase, addLoadingCase, addSuccessCase } from '../util';
import {
  CREDIT_CARDS_REQUEST_FAIL,
  CREDIT_CARDS_REQUEST_SUCCESS,
  CREDIT_CARDS_REQUEST,
  CREDIT_CARD_CREATE_REQUEST_FAIL,
  CREDIT_CARD_CREATE_REQUEST_SUCCESS,
  CREDIT_CARD_CREATE_REQUEST,
  CREDIT_CARD_REQUEST,
  CREDIT_CARD_REQUEST_FAIL,
  CREDIT_CARD_REQUEST_SUCCESS,
  CREDIT_CARD_RESET,
  CREDIT_CARD_UPDATE_REQUEST,
  CREDIT_CARD_UPDATE_REQUEST_FAIL,
  CREDIT_CARD_UPDATE_REQUEST_SUCCESS,
} from './actions';
import { initialState, IState } from './state';

const reducer = createReducer(initialState, (builder: ActionReducerMapBuilder<IState>) => {
  // LIST
  addLoadingCase(builder, CREDIT_CARDS_REQUEST, (state: IState) => state.creditCards);
  addFailCase(builder, CREDIT_CARDS_REQUEST_FAIL, (state: IState) => state.creditCards);
  addSuccessCase(builder, CREDIT_CARDS_REQUEST_SUCCESS, (state: IState) => state.creditCards);
  // GET
  addLoadingCase(builder, CREDIT_CARD_REQUEST, (state: IState) => state.creditCard);
  addFailCase(builder, CREDIT_CARD_REQUEST_FAIL, (state: IState) => state.creditCard);
  addSuccessCase(builder, CREDIT_CARD_REQUEST_SUCCESS, (state: IState) => state.creditCard);
  // CREATE
  addLoadingCase(builder, CREDIT_CARD_CREATE_REQUEST, (state: IState) => state.creditCardAction);
  addFailCase(builder, CREDIT_CARD_CREATE_REQUEST_FAIL, (state: IState) => state.creditCardAction);
  addSuccessCase(
    builder,
    CREDIT_CARD_CREATE_REQUEST_SUCCESS,
    (state: IState) => state.creditCardAction,
  );
  // UPDATE
  addLoadingCase(builder, CREDIT_CARD_UPDATE_REQUEST, (state: IState) => state.creditCardAction);
  addFailCase(builder, CREDIT_CARD_UPDATE_REQUEST_FAIL, (state: IState) => state.creditCardAction);
  addSuccessCase(
    builder,
    CREDIT_CARD_UPDATE_REQUEST_SUCCESS,
    (state: IState) => state.creditCardAction,
  );

  builder.addCase(CREDIT_CARD_RESET, (state) => {
    state.creditCardAction = { ...defaultAsync };
    state.creditCard = { ...defaultAsync };
  });
});

export default reducer;
