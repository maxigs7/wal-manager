import { User } from '@domain/models';

export interface GoogleUser extends Omit<User, '_id'> {}
