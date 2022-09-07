import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseApi } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Category, CategoryMoveForm } from '@models';

const useMove = (showToast = true): UseMutationResult<Category, ApiError, CategoryMoveForm> => {
  const { categories } = useSupabaseApi();
  const toast = useToast();

  return useMutation<Category, ApiError, CategoryMoveForm>(categories.update, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.category.toast.moveSuccess,
        });
    },
    onError: (error: Error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useMove;
