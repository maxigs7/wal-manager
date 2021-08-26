import { DocumentData, DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

export enum FirestoreStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IFirestoreState<T> {
  isLoading: boolean;
  data?: T;
  error?: any;
  status: FirestoreStatus;
}

type FirestoreActionKind = FirestoreStatus;

export type FirestoreQueryAction = { type: FirestoreActionKind; payload?: any };

export type FirestoreQuerySnapshot = QuerySnapshot<DocumentData> | DocumentSnapshot<DocumentData>;
