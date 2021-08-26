import { IFirestoreState, FirestoreQueryAction, FirestoreStatus } from './types';

export function createInitialState<T>(state?: Partial<IFirestoreState<T>>): IFirestoreState<T> {
  return {
    status: FirestoreStatus.IDLE,
    isLoading: false,
    data: undefined,
    error: undefined,
    ...state,
  };
}

// Reducer for hook state and actions
export function createReducer<T>() {
  return (state: IFirestoreState<T>, action: FirestoreQueryAction): IFirestoreState<T> => {
    const { type, payload } = action;
    switch (type) {
      case FirestoreStatus.IDLE:
        return {
          status: FirestoreStatus.IDLE,
          data: undefined,
          error: undefined,
          isLoading: false,
        };
      case FirestoreStatus.LOADING:
        return {
          status: FirestoreStatus.LOADING,
          data: undefined,
          error: undefined,
          isLoading: true,
        };
      case FirestoreStatus.SUCCESS:
        return {
          status: FirestoreStatus.SUCCESS,
          data: payload,
          error: undefined,
          isLoading: false,
        };
      case FirestoreStatus.ERROR:
        return { status: FirestoreStatus.ERROR, data: undefined, error: payload, isLoading: false };
      default:
        return state;
    }
  };
}
