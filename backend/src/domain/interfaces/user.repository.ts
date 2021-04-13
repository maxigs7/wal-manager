import { User } from '../models';

export interface IUserRepository {
  create(doc: User): Promise<string>;
  update(id: string, doc: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
