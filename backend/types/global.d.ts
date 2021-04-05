import { Payload } from '../src/auth/auth.interfaces';

declare global {
  namespace Express {
    interface Request {
      id: string;
      user?: User;
    }
    // eslint-disable-next-line
    interface User extends Payload {}
  }
}
