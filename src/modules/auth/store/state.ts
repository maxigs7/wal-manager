import { User } from '@supabase/supabase-js';

export const initialState: IState = {
  initializing: true,
  user: null,
};

export interface IState {
  initializing: boolean;
  user: User | null;
}
