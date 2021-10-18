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
