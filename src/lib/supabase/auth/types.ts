import { Session, User } from '@supabase/supabase-js';

export type AuthInitPayload = {
  session: Session | null;
  user: User | null;
  initializing: boolean;
};

export type SetUserPayload = {
  session: Session;
  user: User;
};
