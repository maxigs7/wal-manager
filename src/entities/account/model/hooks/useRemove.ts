import { useMutation, UseMutationResult } from 'react-query';

import { Account, useApi } from '@entities';
import { ApiError, useToast } from '@shared';

const hook = (showToast = true): UseMutationResult<Account, ApiError, string> => {
  const { accounts } = useApi();
  const toast = useToast();

  return useMutation<Account, ApiError, string>(accounts.remove, {
    onSuccess: () => {
      showToast &&
        toast.success({ title: 'Exito!', description: 'Se ha eliminado la cuenta correctamente.' });
    },
    onError: (error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};

export default hook;
