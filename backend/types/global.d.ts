import { UserAuthDto } from '../src/application/auth/user/user-auth';

declare global {
  namespace Express {
    interface Request {
      id: string;
      user?: User;
    }
    // eslint-disable-next-line
    interface User extends UserAuthDto {}
  }
}
