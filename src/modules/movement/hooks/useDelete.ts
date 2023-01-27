import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Movement } from '@models';

const useMovementDelete = (showToast = true): UseMutationResult<Movement, ApiError, string> => {
  const { movement } = useUow();
  const toast = useToast();

  return useMutation<Movement, ApiError, string>(
    async (id: string) => {
      const deletedMovement = await movement.rpc<'deleteMovement'>('deleteMovement', {
        id,
      });
      return (deletedMovement as Movement[])[0];
    },
    {
      onSuccess: () => {
        showToast &&
          toast.success({
            title: es.common.toast.success,
            description: es.movement.toast.removeSuccess,
          });
      },
      onError: (error) => {
        showToast && toast.error({ title: es.common.toast.error, description: error.message });
      },
    },
  );
};

export default useMovementDelete;
