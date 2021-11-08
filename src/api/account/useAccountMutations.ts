import { useMemo } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { useApi } from '@api';
import { useToast } from '@lib/chakra-ui';
import { Account } from '@models';

interface IAccountMutation {
  create: UseMutationResult<string, Error, Account>;
  remove: UseMutationResult<void, Error, string>;
  update: UseMutationResult<void, Error, Account>;
}

export const useAccountMutations = (): IAccountMutation => {
  const { accounts } = useApi();
  const queryClient = useQueryClient();
  const toast = useToast();

  const refetchList = () => {
    queryClient.invalidateQueries('accounts', { exact: true, refetchInactive: true });
  };

  const create = useMutation<string, Error, Account>(accounts.create, {
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

  const update = useMutation<void, Error, Account>(accounts.update, {
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
