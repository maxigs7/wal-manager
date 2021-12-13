import { useMutation, UseMutationResult } from 'react-query';

import { Account, useApi } from '@entities';
import { ApiError, useToast } from '@shared';

export default (showToast = true): UseMutationResult<Account, ApiError, Account> => {
  const { accounts } = useApi();
  const toast = useToast();

  return useMutation<Account, ApiError, Account>(accounts.create, {
    onSuccess: () => {
      showToast &&
        toast.success({ title: 'Exito!', description: 'Se ha creado la cuenta correctamente.' });
    },
    onError: (error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};
