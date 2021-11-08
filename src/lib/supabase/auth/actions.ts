import { AuthInitPayload } from './types';

export const AUTH_INIT = '[AUTH] Init';

export type Action = { type: typeof AUTH_INIT; payload: AuthInitPayload };

export const authInit = (payload: AuthInitPayload): Action => ({ type: AUTH_INIT, payload });
