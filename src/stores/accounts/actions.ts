import { createAction } from '@reduxjs/toolkit';

import { Account } from '@app/models/accounts';

import { createAsyncAction } from '../actions';

/******************************
 * LIST
 */
const ACCOUNTS = createAsyncAction<undefined, string, Account[]>('ACCOUNTS');
export const ACCOUNTS_REQUEST = ACCOUNTS.REQUEST;
export const ACCOUNTS_REQUEST_REFRESH = createAction<undefined>('ACCOUNTS/REQUEST_REFRESH');
export const ACCOUNTS_REQUEST_FAIL = ACCOUNTS.FAIL;
export const ACCOUNTS_REQUEST_SUCCESS = ACCOUNTS.SUCCESS;

/******************************
 * GET
 */
const ACCOUNT = createAsyncAction<string, string, Account>('ACCOUNT');
export const ACCOUNT_REQUEST = ACCOUNT.REQUEST;
export const ACCOUNT_REQUEST_FAIL = ACCOUNT.FAIL;
export const ACCOUNT_REQUEST_SUCCESS = ACCOUNT.SUCCESS;

/******************************
 * CREATE
 */
const ACCOUNT_CREATE = createAsyncAction<Account, string, string>('ACCOUNT/CREATE');
export const ACCOUNT_CREATE_REQUEST = ACCOUNT_CREATE.REQUEST;
export const ACCOUNT_CREATE_REQUEST_FAIL = ACCOUNT_CREATE.FAIL;
export const ACCOUNT_CREATE_REQUEST_SUCCESS = ACCOUNT_CREATE.SUCCESS;

/******************************
 * UPDATE
 */
const ACCOUNT_UPDATE = createAsyncAction<Account, string, undefined>('ACCOUNT/UPDATE');
export const ACCOUNT_UPDATE_REQUEST = ACCOUNT_UPDATE.REQUEST;
export const ACCOUNT_UPDATE_REQUEST_FAIL = ACCOUNT_UPDATE.FAIL;
export const ACCOUNT_UPDATE_REQUEST_SUCCESS = ACCOUNT_UPDATE.SUCCESS;

/******************************
 * REMOVE
 */
const ACCOUNT_REMOVE = createAsyncAction<string, string, undefined>('ACCOUNT/REMOVE');
export const ACCOUNT_REMOVE_REQUEST = ACCOUNT_REMOVE.REQUEST;
export const ACCOUNT_REMOVE_REQUEST_FAIL = ACCOUNT_REMOVE.FAIL;
export const ACCOUNT_REMOVE_REQUEST_SUCCESS = ACCOUNT_REMOVE.SUCCESS;

/******************************
 * FORM
 */
export const ACCOUNT_RESET = createAction('ACCOUNT/RESET');
export const ACCOUNT_SELECTED = createAction<Account>('ACCOUNT/SELECTED');
