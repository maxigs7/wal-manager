import { PostgrestError, PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { ApiError as SupabaseApiError } from '@supabase/supabase-js';

export type BaseModel = {
  id: string;
};

type CamelToSnake<T extends string, P extends string = ''> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
  ? CamelToSnake<R, `${P}${C0 extends Uppercase<C0> ? '_' : ''}${Lowercase<C0>}`>
  : P;

type CamelToSnakeNested<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T as CamelToSnake<K & string>]: CamelToSnakeNested<T[K]>;
    }
  : T;

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
  filtering?: (
    query: PostgrestFilterBuilder<CamelToSnakeNested<T>>,
  ) => PostgrestFilterBuilder<CamelToSnakeNested<T>>;
}

export interface IRepository<T extends BaseModel> {
  create(model: T): Promise<T>;
  getAll(options?: IGetAllOptions<T>): Promise<T[]>;
  getById(id: string): Promise<T>;
  remove(id: string): Promise<T>;
  update(model: T): Promise<T>;
}
