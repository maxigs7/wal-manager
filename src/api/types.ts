import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

import { Account } from '@models/accounts';
import { Category } from '@models/categories';
import { BaseModel } from '@models/common';
import { CreditCard } from '@models/credit-cards';
import { Transaction } from '@models/transactions';

import { IAuthRepository } from './auth';

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
  transactions: IRepository<Transaction>;
}

export interface IGetAllOptions<T> {
  columns?: string;
  sort?: { field: string; ascending?: boolean };
  filtering?: (
    query: PostgrestFilterBuilder<CamelToSnakeNested<T>>,
  ) => PostgrestFilterBuilder<CamelToSnakeNested<T>>;
}

export interface IRepository<T extends BaseModel> {
  create(model: T): Promise<string>;
  getAll(options?: IGetAllOptions<T>): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  remove(id: string): Promise<void>;
  update(model: T): Promise<void>;
}
