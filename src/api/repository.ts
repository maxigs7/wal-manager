import { SupabaseClient } from '@supabase/supabase-js';

import { BaseModel } from '@models';

import { IGetAllOptions, IRepository } from './types';
import { camelCase, getTableName, snakeCase } from './util';

export const buildRepository = <T extends BaseModel>(
  supabase: SupabaseClient,
  key: string,
): IRepository<T> => {
  const tableName = getTableName(key);
  return {
    create: async (model: T): Promise<T> => {
      const { data, error } = await supabase.from(tableName).insert(snakeCase(model));
      if (error || !data) {
        throw new Error(JSON.stringify(error));
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
        throw new Error(JSON.stringify(error));
      }
      return data ? (camelCase(data) as T[]) : [];
    },
    getById: async (id: string, columns?: string): Promise<T | null> => {
      const { data, error } = await supabase.from(tableName).select(columns).match({ id });
      if (error) {
        throw new Error(JSON.stringify(error));
      }
      if (data) {
        return camelCase(data[0]) as T;
      }
      return null;
    },
    remove: async (id: string): Promise<T> => {
      const { data, error } = await supabase.from<T>(tableName).delete().match({ id });
      if (error || !data) {
        throw new Error(JSON.stringify(error));
      }
      return camelCase(data[0]) as T;
    },
    update: async (model: T): Promise<T> => {
      const { data, error } = await supabase
        .from<T>(tableName)
        .update(snakeCase(model))
        .match({ id: model.id });
      if (error || !data) {
        throw new Error(JSON.stringify(error));
      }
      return camelCase(data[0]) as T;
    },
  };
};
