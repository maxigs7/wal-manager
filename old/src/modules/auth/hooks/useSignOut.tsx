import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { ApiError } from '@lib';

export const useSignOut = (): UseMutationResult<void, ApiError, void> => {
  const { auth } = useApi();
  return useMutation<void, ApiError, void>(auth.signOut);
};
