import { createReducer } from '@reduxjs/toolkit';

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  SET_INITIALIZED,
  SET_USER,
} from './actions';
import { initialState } from './state';

const reducer = createReducer(initialState, {
  [LOGIN_FAIL.type]: (state, action) => {
    state.error = action.payload;
  },
  [LOGIN_SUCCESS.type]: (state, action) => {
    state.redirectTo = action.payload.redirectTo;
    state.user = action.payload.user;
    state.userId = action.payload.user.uid;
  },
  [LOGOUT_FAIL.type]: (state, action) => {
    state.error = action.payload;
  },
  [LOGOUT_SUCCESS.type]: (state) => {
    state.redirectTo = undefined;
    state.user = undefined;
    state.userId = undefined;
  },
  [SET_INITIALIZED.type]: (state, action) => {
    state.initialized = action.payload;
  },
  [SET_USER.type]: (state, action) => {
    state.user = { ...state.user, ...action.payload };
    state.userId = action.payload.uid;
  },
});

export default reducer;
