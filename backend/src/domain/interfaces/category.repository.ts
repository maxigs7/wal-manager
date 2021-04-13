import { Category } from '../models';

export interface ICategoryRepository {
  create(doc: Category): Promise<string>;
  update(id: string, doc: Partial<Category>): Promise<Category>;
  findAll(
    conditions?: Partial<Record<keyof Category, unknown>>,
  ): Promise<Category[]>;
}
