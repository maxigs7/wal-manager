import { ObservableStatus } from 'reactfire';
export * from './wal-firebase-app-provider';
export { converter } from './converter';

export interface IdleObservableStatus<T> extends Omit<ObservableStatus<T>, 'status'> {
  status: 'loading' | 'error' | 'success' | 'idle';
  isIdle: boolean;
  isLoading: boolean;
  hasErrors: boolean;
}
