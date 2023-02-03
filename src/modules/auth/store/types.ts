import { Session, User } from '@supabase/auth-helpers-nextjs';

export type AuthInitPayload = {
  session: Session | null;
  user: User | null;
  initializing: boolean;
};

export type SetUserPayload = {
  session: Session;
  user: User;
};
