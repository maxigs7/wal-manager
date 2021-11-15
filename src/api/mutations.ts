import { useMemo } from 'react';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';

import { BaseModel } from '@models';

import { IRepository } from './types';

interface IUseMutationsReturn<TModel> {
  create(
    options: UseMutationOptions<TModel, Error, TModel>,
  ): UseMutationResult<TModel, Error, TModel>;
  remove(
    options: UseMutationOptions<TModel, Error, string>,
  ): UseMutationResult<TModel, Error, string>;
  update(
    options: UseMutationOptions<TModel, Error, TModel>,
  ): UseMutationResult<TModel, Error, TModel>;
}

export const useMutations = <TModel extends BaseModel>(
  repo: IRepository<TModel>,
): IUseMutationsReturn<TModel> => {
  const create = (options: UseMutationOptions<TModel, Error, TModel>) =>
    useMutation<TModel, Error, TModel>(repo.create, options);

  const remove = (options: UseMutationOptions<TModel, Error, string>) =>
    useMutation<TModel, Error, string>(repo.remove, options);

  const update = (options: UseMutationOptions<TModel, Error, TModel>) =>
    useMutation<TModel, Error, TModel>(repo.update, options);

  return useMemo(
    () => ({
      create,
      update,
      remove,
    }),
    [create, update, remove],
  );
};
