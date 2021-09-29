import { createAction } from '@reduxjs/toolkit';

import { IUser } from './state';

export const LOGIN_REQUEST = createAction<string>('AUTH/LOGIN_REQUEST');
export const LOGIN_SUCCESS =
  createAction<{ redirectTo: string; user: IUser }>('AUTH/LOGIN_SUCCESS');
export const LOGIN_FAIL = createAction<string>('AUTH/LOGIN_FAIL');

export const LOGOUT_REQUEST = createAction<void>('AUTH/LOGOUT_REQUEST');
export const LOGOUT_SUCCESS = createAction<void>('AUTH/LOGOUT_SUCCESS');
export const LOGOUT_FAIL = createAction<string>('AUTH/LOGIN_FAIL');

export const SET_INITIALIZED = createAction<boolean>('AUTH/SET_INITIALIZED');
export const SET_USER = createAction<IUser>('AUTH/SET_USER');
