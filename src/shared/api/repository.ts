import { SupabaseClient } from '@supabase/supabase-js';

import { camelCase, snakeCase } from '@shared';

import { ApiError, BaseModel, IGetAllOptions, IRepository } from './types';

export const genericRepository = <T extends BaseModel>(
  supabase: SupabaseClient,
  tableName: string,
): IRepository<T> => {
  return {
    create: async (model: T): Promise<T> => {
      const { data, error } = await supabase.from(tableName).insert(snakeCase(model));
      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return camelCase(data[0]) as T;
    },
    getAll: async (options?: IGetAllOptions<T>): Promise<T[]> => {
      const query = supabase.from(tableName).select(options?.columns);
      const querySorted = options?.sort
        ? query.order(options.sort.field, { ascending: options.sort.ascending || true })
        : query;
      const queryFiltered = options?.filtering ? options.filtering(querySorted) : query;
      const { data, error } = await queryFiltered;
      if (error) {
        throw new ApiError(error);
      }
      return data ? (camelCase(data) as T[]) : [];
    },
    getById: async (id: string, columns?: string): Promise<T> => {
      const { data, error } = await supabase.from(tableName).select(columns).match({ id });
      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return camelCase(data[0]) as T;
    },
    remove: async (id: string): Promise<T> => {
      const { data, error } = await supabase.from<T>(tableName).delete().match({ id });
      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return camelCase(data[0]) as T;
    },
    update: async (model: T): Promise<T> => {
      const { data, error } = await supabase
        .from<T>(tableName)
        .update(snakeCase(model))
        .match({ id: model.id });
      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return camelCase(data[0]) as T;
    },
  };
};
