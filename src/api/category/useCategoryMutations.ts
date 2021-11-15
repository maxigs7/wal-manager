import { useMemo } from 'react';
import { UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { useToast } from '@lib/chakra-ui';
import { Category } from '@models';

import { useMutations } from '../mutations';

interface ICategoryMutation {
  create: UseMutationResult<Category, Error, Category>;
  remove: UseMutationResult<Category, Error, string>;
  update: UseMutationResult<Category, Error, Category>;
}

export const useCategoryMutations = (): ICategoryMutation => {
  const { categories } = useApi();
  const mutations = useMutations<Category>(categories);
  const toast = useToast();

  const create = mutations.create({
    onSuccess: () => {
      toast.success({ title: 'Exito!', description: 'Se ha creado la categoria correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const remove = mutations.remove({
    onSuccess: () => {
      toast.success({
        title: 'Exito!',
        description: 'Se ha eliminado la categoria correctamente.',
      });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const update = mutations.update({
    onSuccess: () => {
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
