import { User } from '@supabase/auth-helpers-nextjs';

export const AUTH_END = '[AUTH] End';
export const AUTH_START = '[AUTH] Start';

export type Actions = { type: typeof AUTH_END } | { type: typeof AUTH_START; payload: User | null };

export const authEnd = (): Actions => ({ type: AUTH_END });
export const authStart = (payload: User | null): Actions => ({ type: AUTH_START, payload });
