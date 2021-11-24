import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

import { Account, BaseModel, Category, CreditCard } from '@models';

import { IAuthRepository } from './auth';
import { ITransactionRepository } from './transaction';

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

export interface IApi {
  accounts: IRepository<Account>;
  auth: IAuthRepository;
  categories: IRepository<Category>;
  creditCards: IRepository<CreditCard>;
  transactions: ITransactionRepository;
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
  getById(id: string): Promise<T | null>;
  remove(id: string): Promise<T>;
  update(model: T): Promise<T>;
}
