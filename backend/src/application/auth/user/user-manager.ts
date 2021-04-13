import { User } from '@domain/models';
import { GoogleUser } from './google-user';

export interface IUserManager {
  googleLogin(user: GoogleUser): Promise<User>;
}
