import { Entity } from './models';

export enum LoginProvider {
  Google = 'Google',
  Facebook = 'Facebook',
  Local = 'Local',
}

export type User = Entity & {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  provider?: LoginProvider;
};
