import { IState } from './state';

export type AuthInitPayload = Omit<IState, 'initializing'>;
