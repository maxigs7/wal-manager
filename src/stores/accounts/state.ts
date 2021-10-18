import { Account } from '@app/models/accounts';

import { defaultAsync, IAsyncState } from '../state';

export const initialState: IState = {
  accounts: {
    ...defaultAsync,
    data: [],
  },
};

export interface IState {
  accounts: IAsyncState<Account[]>;
}
