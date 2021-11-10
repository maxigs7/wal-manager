import { useMemo } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { useApi } from '@api';
import { useToast } from '@lib/chakra-ui';
import { Account } from '@models';

interface IAccountMutation {
  create: UseMutationResult<Account, Error, Account>;
  remove: UseMutationResult<void, Error, string>;
  update: UseMutationResult<Account, Error, Account>;
}

export const useAccountMutations = (): IAccountMutation => {
  const { accounts } = useApi();
  const queryClient = useQueryClient();
  const toast = useToast();

  const refetchList = () => {
    queryClient.invalidateQueries('accounts', { exact: true, refetchInactive: true });
  };

  const create = useMutation<Account, Error, Account>(accounts.create, {
    onSuccess: () => {
      refetchList();
      toast.success({ title: 'Exito!', description: 'Se ha creado la cuenta correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const remove = useMutation<void, Error, string>(accounts.remove, {
    onSuccess: () => {
      refetchList();
      toast.success({ title: 'Exito!', description: 'Se ha eliminado la cuenta correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const update = useMutation<Account, Error, Account>(accounts.update, {
    onSuccess: () => {
      refetchList();
      toast.success({ title: 'Exito!', description: 'Se ha actualizado la cuenta correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  return useMemo(
    () => ({
      create,
      update,
      remove,
    }),
    [create, update, remove],
  );
};
