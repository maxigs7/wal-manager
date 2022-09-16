import { SupabaseClient } from '@supabase/supabase-js';

import { ApiError } from './api-error';
import { BaseModel, IGenericRepository, IGetAllOptions } from './types';
import { cleanFromServer, cleanToServer } from './util';

export class GenericRepository<T extends BaseModel> implements IGenericRepository<T> {
  constructor(protected supabase: SupabaseClient, private table: string) {}

  protected get from() {
    return this.supabase.from(this.table);
  }

  create = async (model: T): Promise<T> => {
    const { data, error, ...etc } = await this.from.insert<T>(cleanToServer(model)).select();

    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return cleanFromServer(data[0]) as T;
  };

  getAll = async (options?: IGetAllOptions<T>): Promise<T[]> => {
    const query = this.from.select(options?.columns);
    const querySorted = options?.sort
      ? query.order(options.sort.field, { ascending: options.sort.ascending || true })
      : query;
    const queryFiltered = options?.filtering ? options.filtering(querySorted) : query;
    const { data, error } = await queryFiltered;
    if (error) {
      throw new ApiError(error);
    }
    return data ? (cleanFromServer(data) as T[]) : [];
  };

  getById = async (id: string, columns?: string): Promise<T> => {
    const { data, error } = await this.from.select(columns).match({ id });
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return cleanFromServer(data[0]) as T;
  };

  remove = async (id: string): Promise<T> => {
    const { data, error } = await this.from.delete().match({ id }).select();
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return cleanFromServer(data[0]) as T;
  };

  update = async (model: Partial<T>): Promise<T> => {
    const { data, error } = await this.from
      .update(cleanToServer(model))
      .match({ id: model.id })
      .select();
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return cleanFromServer(data[0]) as T;
  };
}
