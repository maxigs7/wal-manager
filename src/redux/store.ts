import { useDispatch } from 'react-redux';
import { AnyAction, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import reducer, { RootState } from './reducers';
import { Dispatch } from 'react';

/**
 * initStore
 * Initialise and export redux store
 */

const store: Store<RootState> = createStore(reducer, composeWithDevTools());

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Dispatch<AnyAction> => useDispatch<AppDispatch>();
export const storeWrapper = createWrapper(() => store);
export default store;
