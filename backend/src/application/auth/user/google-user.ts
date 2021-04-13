import { User } from '@domain/models';

export type GoogleUser = Omit<User, '_id'>;
