import { User } from '@supabase/auth-helpers-nextjs';

export const initialState: State = {
  initializing: true,
  user: null,
};

export type State = {
  initializing: boolean;
  user: User | null;
};
