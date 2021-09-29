export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface IAsyncState<TData, TError = string> {
  data?: TData;
  error?: TError;
  status: AsyncStatus;
  isLoading: boolean;
}
