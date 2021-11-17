import { useMemo } from 'react';
import { UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { useToast } from '@lib/chakra-ui';
import { Transaction } from '@models';

import { useMutations } from '../mutations';

interface ITransactionMutation {
  create: UseMutationResult<Transaction, Error, Transaction>;
  remove: UseMutationResult<Transaction, Error, string>;
}

export const useTransactionMutations = (): ITransactionMutation => {
  const { transactions } = useApi();
  const mutations = useMutations<Transaction>(transactions);
  const toast = useToast();

  const create = mutations.create({
    onSuccess: () => {
      toast.success({ title: 'Exito!', description: 'Se ha creado la transaccion correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const remove = mutations.remove({
    onSuccess: () => {
      toast.success({
        title: 'Exito!',
        description: 'Se ha eliminado la transaccion correctamente.',
      });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  return useMemo(
    () => ({
      create,
      remove,
    }),
    [create, remove],
  );
};
