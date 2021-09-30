import { PayloadActionCreator, createAction } from '@reduxjs/toolkit';

export const createAsyncAction = <TRequestPayload, TFailPayload, TSuccessPayload>(
  key: string,
): {
  REQUEST: PayloadActionCreator<TRequestPayload>;
  FAIL: PayloadActionCreator<TFailPayload>;
  SUCCESS: PayloadActionCreator<TSuccessPayload>;
} => {
  return {
    REQUEST: createAction<TRequestPayload>(`${key}/REQUEST`),
    FAIL: createAction<TFailPayload>(`${key}/REQUEST_FAIL`),
    SUCCESS: createAction<TSuccessPayload>(`${key}/REQUEST_SUCCESS`),
  };
};
