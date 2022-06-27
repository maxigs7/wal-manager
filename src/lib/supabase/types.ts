import { PostgrestError, PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { ApiError as SupabaseApiError } from '@supabase/supabase-js';

export type BaseModel = {
  id: string;
};

export class ApiError extends Error {
  public code: string;
  public details: string;
  public hint: string;

  constructor(error: PostgrestError | SupabaseApiError) {
    const postgrestError = error as PostgrestError;
    super(error.message);
    this.code = postgrestError?.code;
    this.details = postgrestError?.details;
    this.hint = postgrestError?.hint;
  }
}

export interface IGetAllOptions<T> {
  columns?: string;
  sort?: { field: string; ascending?: boolean };
  filtering?: (query: PostgrestFilterBuilder<T>) => PostgrestFilterBuilder<T>;
}

export interface IRepository<T extends BaseModel> {
  create(model: T): Promise<T>;
  getAll(options?: IGetAllOptions<T>): Promise<T[]>;
  getById(id: string): Promise<T>;
  remove(id: string): Promise<T>;
  update(model: T): Promise<T>;
}
