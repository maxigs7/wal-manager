import { Auth } from '@firebase/auth';
import { Firestore } from '@firebase/firestore';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { reducer as authReducer } from './auth';
import { reducer as categoriesReducer } from './categories';
import { reducer as creditCardsReducer } from './credit-cards';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    creditCards: creditCardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

export const runSagas = (authSdk: Auth, firestoreSdk: Firestore): void => {
  sagaMiddleware.run(rootSaga, authSdk, firestoreSdk);
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState, categories: CategoriesState}
export type AppDispatch = typeof store.dispatch;
