import { ActionCreatorWithPayload, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IAsyncState } from './state';

export const addFailCase = (
  builder: ActionReducerMapBuilder<any>,
  actionCase: ActionCreatorWithPayload<any, string>,
  selectionState: (state: any) => IAsyncState<any>,
): void => {
  builder.addCase(actionCase, (state, action) => {
    const slice = selectionState(state);
    slice.isLoading = false;
    slice.error = action.payload;
    slice.status = 'error';
  });
};

export const addLoadingCase = (
  builder: ActionReducerMapBuilder<any>,
  action: ActionCreatorWithPayload<any, string>,
  selectionState: (state: any) => IAsyncState<any>,
): void => {
  builder.addCase(action, (state) => {
    const slice = selectionState(state);
    slice.isLoading = true;
    slice.status = 'loading';
    slice.params = state.params;
  });
};

export const addSuccessCase = (
  builder: ActionReducerMapBuilder<any>,
  actionCase: ActionCreatorWithPayload<any, string>,
  selectionState: (state: any) => IAsyncState<any>,
): void => {
  builder.addCase(actionCase, (state, action) => {
    const slice = selectionState(state);
    slice.isLoading = false;
    slice.data = action.payload;
    slice.status = 'success';
  });
};
