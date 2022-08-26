import { User } from '@supabase/supabase-js';

export const AUTH_START = '[AUTH] Start';

export type Actions = { type: typeof AUTH_START; payload: User | null };

export const authStart = (payload: User | null): Actions => ({ type: AUTH_START, payload });
