import { User } from '@domain/models';

export interface IAuthService {
  createFromExternal();
  login(user: User);
}
