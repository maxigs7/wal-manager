import { Session, User } from '@supabase/supabase-js';

export const initialState: IState = {
  initializing: true,
  user: null,
  session: null,
};

export interface IState {
  initializing: boolean;
  user: User | null;
  session: Session | null;
}
