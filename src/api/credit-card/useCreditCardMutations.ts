import { useMemo } from 'react';
import { UseMutationResult, useQueryClient } from 'react-query';

import { useApi } from '@api';
import { useToast } from '@lib/chakra-ui';
import { CreditCard } from '@models';

import { useMutations } from '../mutations';
import { CREDIT_CARDS_KEY } from './constants';

interface ICreditCardMutation {
  create: UseMutationResult<CreditCard, Error, CreditCard>;
  remove: UseMutationResult<CreditCard, Error, string>;
  update: UseMutationResult<CreditCard, Error, CreditCard>;
}

export const useCreditCardMutations = (): ICreditCardMutation => {
  const { creditCards } = useApi();
  const mutations = useMutations<CreditCard>(creditCards);
  const toast = useToast();
  const queryClient = useQueryClient();

  const create = mutations.create({
    onSuccess: () => {
      toast.success({ title: 'Exito!', description: 'Se ha creado la tarjeta correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const remove = mutations.remove({
    onSuccess: () => {
      toast.success({ title: 'Exito!', description: 'Se ha eliminado la tarjeta correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const update = mutations.update({
    onSuccess: (data) => {
      queryClient.invalidateQueries([CREDIT_CARDS_KEY, data.id], { exact: true });
      toast.success({
        title: 'Exito!',
        description: 'Se ha actualizado la tarjeta correctamente.',
      });
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
