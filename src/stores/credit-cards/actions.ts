import { createAction } from '@reduxjs/toolkit';

import { CreditCard } from '@app/models/credit-cards';

import { createAsyncAction } from '../actions';

/******************************
 * LIST
 */
const CREDIT_CARDS = createAsyncAction<undefined, string, CreditCard[]>('CREDIT_CARDS');
export const CREDIT_CARDS_REQUEST = CREDIT_CARDS.REQUEST;
export const CREDIT_CARDS_REQUEST_REFRESH = createAction<undefined>('CREDIT_CARDS/REQUEST_REFRESH');
export const CREDIT_CARDS_REQUEST_FAIL = CREDIT_CARDS.FAIL;
export const CREDIT_CARDS_REQUEST_SUCCESS = CREDIT_CARDS.SUCCESS;

/******************************
 * GET
 */
const CREDIT_CARD = createAsyncAction<string, string, CreditCard>('CREDIT_CARD');
export const CREDIT_CARD_REQUEST = CREDIT_CARD.REQUEST;
export const CREDIT_CARD_REQUEST_FAIL = CREDIT_CARD.FAIL;
export const CREDIT_CARD_REQUEST_SUCCESS = CREDIT_CARD.SUCCESS;

/******************************
 * CREATE
 */
const CREDIT_CARD_CREATE = createAsyncAction<CreditCard, string, string>('CREDIT_CARD/CREATE');
export const CREDIT_CARD_CREATE_REQUEST = CREDIT_CARD_CREATE.REQUEST;
export const CREDIT_CARD_CREATE_REQUEST_FAIL = CREDIT_CARD_CREATE.FAIL;
export const CREDIT_CARD_CREATE_REQUEST_SUCCESS = CREDIT_CARD_CREATE.SUCCESS;

/******************************
 * UPDATE
 */
const CREDIT_CARD_UPDATE = createAsyncAction<CreditCard, string, undefined>('CREDIT_CARD/UPDATE');
export const CREDIT_CARD_UPDATE_REQUEST = CREDIT_CARD_UPDATE.REQUEST;
export const CREDIT_CARD_UPDATE_REQUEST_FAIL = CREDIT_CARD_UPDATE.FAIL;
export const CREDIT_CARD_UPDATE_REQUEST_SUCCESS = CREDIT_CARD_UPDATE.SUCCESS;

/******************************
 * REMOVE
 */
const CREDIT_CARD_REMOVE = createAsyncAction<string, string, undefined>('CREDIT_CARD/REMOVE');
export const CREDIT_CARD_REMOVE_REQUEST = CREDIT_CARD_REMOVE.REQUEST;
export const CREDIT_CARD_REMOVE_REQUEST_FAIL = CREDIT_CARD_REMOVE.FAIL;
export const CREDIT_CARD_REMOVE_REQUEST_SUCCESS = CREDIT_CARD_REMOVE.SUCCESS;

/******************************
 * FORM
 */
export const CREDIT_CARD_RESET = createAction('CREDIT_CARD/RESET');
export const CREDIT_CARD_SELECTED = createAction<CreditCard>('CREDIT_CARD/SELECTED');
