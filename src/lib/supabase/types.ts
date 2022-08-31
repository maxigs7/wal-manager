import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

export type BaseModel = {
  id: string;
};

export interface IGetAllOptions<T extends BaseModel> {
  columns?: string;
  sort?: { field: string; ascending?: boolean };
  filtering?: (query: PostgrestFilterBuilder<T, any>) => PostgrestFilterBuilder<T, any>;
}

export interface IGenericRepository<T extends BaseModel> {
  create(model: T): Promise<T>;
  getAll(options?: IGetAllOptions<T>): Promise<T[]>;
  getById(id: string, columns?: string): Promise<T>;
  remove(id: string): Promise<T>;
  update(model: Partial<T>): Promise<T>;
}
