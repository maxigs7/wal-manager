import { useMutation, UseMutationResult } from 'react-query';

import { ApiError, useApi } from '@api';

export const useSignOut = (): UseMutationResult<void, ApiError, void> => {
  const { auth } = useApi();
  return useMutation<void, ApiError, void>(auth.signOut);
};
