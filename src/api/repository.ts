import { SupabaseClient } from '@supabase/supabase-js';

import {
  ApiError,
  BaseModel,
  cleanFromServer,
  cleanToServer,
  IGetAllOptions,
  IRepository,
} from '@lib';

export const genericRepository = <T extends BaseModel>(
  supabase: SupabaseClient,
  tableName: string,
): IRepository<T> => {
  return {
    create: async (model: T): Promise<T> => {
      const { data, error } = await supabase.from(tableName).insert(cleanToServer(model));
      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return cleanFromServer(data[0]) as T;
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
      return data ? (cleanFromServer(data) as T[]) : [];
    },
    getById: async (id: string, columns?: string): Promise<T> => {
      const { data, error } = await supabase.from(tableName).select(columns).match({ id });
      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return cleanFromServer(data[0]) as T;
    },
    remove: async (id: string): Promise<T> => {
      const { data, error } = await supabase.from<T>(tableName).delete().match({ id });
      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return cleanFromServer(data[0]) as T;
    },
    update: async (model: T): Promise<T> => {
      const { data, error } = await supabase
        .from<T>(tableName)
        .update(cleanToServer(model))
        .match({ id: model.id });
      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return cleanFromServer(data[0]) as T;
    },
  };
};
