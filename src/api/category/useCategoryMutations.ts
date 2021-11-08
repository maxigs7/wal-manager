import { useMemo } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { useApi } from '@api';
import { useToast } from '@lib/chakra-ui';
import { Category } from '@models/categories';
import { CategoryType } from '@models/common';

interface ICategoryMutation {
  create: UseMutationResult<string, Error, Category>;
  remove: UseMutationResult<void, Error, string>;
  update: UseMutationResult<void, Error, Category>;
}

export const useCategoryMutations = (): ICategoryMutation => {
  const { categories } = useApi();
  const queryClient = useQueryClient();
  const toast = useToast();

  const refetchList = (type: CategoryType) => {
    queryClient.invalidateQueries(['categories', type], { exact: true, refetchInactive: true });
  };

  const create = useMutation<string, Error, Category>(categories.create, {
    onSuccess: () => {
      refetchList(CategoryType.Expense);
      toast.success({ title: 'Exito!', description: 'Se ha creado la categoria correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const remove = useMutation<void, Error, string>(categories.remove, {
    onSuccess: () => {
      refetchList(CategoryType.Expense);
      toast.success({
        title: 'Exito!',
        description: 'Se ha eliminado la categoria correctamente.',
      });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const update = useMutation<void, Error, Category>(categories.update, {
    onSuccess: () => {
      refetchList(CategoryType.Expense);
      toast.success({
        title: 'Exito!',
        description: 'Se ha actualizado la categoria correctamente.',
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
