import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@entities';
import { ApiError } from '@shared';

export const useSignOut = (): UseMutationResult<void, ApiError, void> => {
  const { auth } = useApi();
  return useMutation<void, ApiError, void>(auth.signOut);
};
