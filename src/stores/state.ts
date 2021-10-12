export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export const defaultAsync = {
  data: undefined,
  status: 'idle' as AsyncStatus,
  isLoading: false,
};
export interface IAsyncState<TData, TError = string, TParams = any> {
  data?: TData;
  error?: TError;
  isLoading: boolean;
  status: AsyncStatus;
  params?: TParams;
}
