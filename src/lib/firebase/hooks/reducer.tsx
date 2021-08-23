import { IFirestoreState, FirestoreQueryAction, FirestoreStatus } from './types';

// Reducer for hook state and actions
export function createReducer<T>() {
  return (state: IFirestoreState<T>, action: FirestoreQueryAction): IFirestoreState<T> => {
    const { type, payload } = action;
    switch (type) {
      case FirestoreStatus.IDLE:
        return { status: FirestoreStatus.IDLE, data: undefined, error: undefined };
      case FirestoreStatus.LOADING:
        return { status: FirestoreStatus.LOADING, data: undefined, error: undefined };
      case FirestoreStatus.SUCCESS:
        return { status: FirestoreStatus.SUCCESS, data: payload, error: undefined };
      case FirestoreStatus.ERROR:
        return { status: FirestoreStatus.ERROR, data: undefined, error: payload };
      default:
        return state;
    }
  };
}
