import { useMemo } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { useApi } from '@api';
import { useToast } from '@lib/chakra-ui';
import { CreditCard } from '@models';

interface ICreditCardMutation {
  create: UseMutationResult<CreditCard, Error, CreditCard>;
  remove: UseMutationResult<void, Error, string>;
  update: UseMutationResult<CreditCard, Error, CreditCard>;
}

export const useCreditCardMutations = (): ICreditCardMutation => {
  const { creditCards } = useApi();
  const queryClient = useQueryClient();
  const toast = useToast();

  const refetchList = () => {
    queryClient.invalidateQueries('creditCards', { exact: true, refetchInactive: true });
  };

  const create = useMutation<CreditCard, Error, CreditCard>(creditCards.create, {
    onSuccess: () => {
      refetchList();
      toast.success({ title: 'Exito!', description: 'Se ha creado la cuenta correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const remove = useMutation<void, Error, string>(creditCards.remove, {
    onSuccess: () => {
      refetchList();
      toast.success({ title: 'Exito!', description: 'Se ha eliminado la cuenta correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const update = useMutation<CreditCard, Error, CreditCard>(creditCards.update, {
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
