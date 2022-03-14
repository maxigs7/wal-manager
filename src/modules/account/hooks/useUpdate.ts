import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { ApiError, useToast } from '@lib';
import { Account } from '@models';

const hook = (showToast = true): UseMutationResult<Account, ApiError, Account> => {
  const { accounts } = useApi();
  const toast = useToast();

  return useMutation<Account, ApiError, Account>(accounts.update, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: 'Exito!',
          description: 'Se ha actualizado la cuenta correctamente.',
        });
    },
    onError: (error: Error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};

export default hook;
