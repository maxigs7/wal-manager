import { SupabaseClient } from '@supabase/supabase-js';

import { ApiError } from './api-error';
import { BaseModel, IGenericRepository, IGetAllOptions } from './types';

export class GenericRepository<T extends BaseModel> implements IGenericRepository<T> {
  constructor(protected supabase: SupabaseClient, private table: string) {}

  protected get from() {
    return this.supabase.from(this.table);
  }

  create = async (model: T): Promise<T> => {
    const { data, error, ...etc } = await this.from.insert<T>(this.cleanToServer(model)).select();

    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return this.cleanFromServer(data[0]) as T;
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
    return data ? (this.cleanFromServer(data) as T[]) : [];
  };

  getById = async (id: string, columns?: string): Promise<T> => {
    const { data, error } = await this.from.select(columns).match({ id });
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return this.cleanFromServer(data[0]) as T;
  };

  remove = async (id: string): Promise<T> => {
    const { data, error } = await this.from.delete().match({ id }).select();
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return this.cleanFromServer(data[0]) as T;
  };

  update = async (model: Partial<T>): Promise<T> => {
    const { data, error } = await this.from
      .update(this.cleanToServer(model))
      .match({ id: model.id })
      .select();
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return this.cleanFromServer(data[0]) as T;
  };

  private isUndefinedSafe(obj: any, key: string) {
    return typeof obj[key] === 'undefined' || obj[key] === '';
  }

  private isNullSafe(obj: any, key: string) {
    return obj[key] === null;
  }

  protected cleanFromServer(obj: any, cleanNull = true): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => this.cleanFromServer(v));
    } else if (obj != null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [key]:
            cleanNull && this.isNullSafe(obj, key) ? undefined : this.cleanFromServer(obj[key]),
        }),
        {},
      );
    }
    return obj;
  }

  protected cleanToServer(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => this.cleanToServer(v));
    } else if (obj != null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [key]: this.isUndefinedSafe(obj, key) ? null : this.cleanToServer(obj[key]),
        }),
        {},
      );
    }
    return obj;
  }
}
