import { User } from '@supabase/auth-helpers-nextjs';

export const initialState: IState = {
  initializing: true,
  user: null,
};

export interface IState {
  initializing: boolean;
  user: User | null;
}
