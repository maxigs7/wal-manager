import { Category } from './entity';

export interface ICategoryRepository {
  // UpdateById(userId: string, updatedFields: Partial<User>): Promise<User>;
  create(model: Category): Promise<string>;
  find(): Promise<Category[]>;
}
