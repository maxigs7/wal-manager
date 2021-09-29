import { RootState } from '..';
import { IUser } from './state';

export const selectUser = (state: RootState): IUser | undefined => state.auth.user;
