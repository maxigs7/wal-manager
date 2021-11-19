import { useMemo } from 'react';
import { UseMutationResult, useQueryClient } from 'react-query';

import { useApi } from '@api';
import { useToast } from '@lib/chakra-ui';
import { Account } from '@models';

import { useMutations } from '../mutations';
import { ACCOUNTS_KEY } from './constants';

interface IAccountMutation {
  create: UseMutationResult<Account, Error, Account>;
  remove: UseMutationResult<Account, Error, string>;
  update: UseMutationResult<Account, Error, Account>;
}

export const useAccountMutations = (): IAccountMutation => {
  const { accounts } = useApi();
  const mutations = useMutations<Account>(accounts);
  const toast = useToast();
  const queryClient = useQueryClient();

  const create = mutations.create({
    onSuccess: () => {
      toast.success({ title: 'Exito!', description: 'Se ha creado la cuenta correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const remove = mutations.remove({
    onSuccess: () => {
      toast.success({ title: 'Exito!', description: 'Se ha eliminado la cuenta correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const update = mutations.update({
    onSuccess: (data) => {
      queryClient.invalidateQueries([ACCOUNTS_KEY, data.id], { exact: true });
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
