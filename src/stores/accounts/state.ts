import { Account } from '@app/models/accounts';

import { defaultAsync, IAsyncState } from '../state';

export const initialState: IState = {
  account: { ...defaultAsync },
  formSubmission: { ...defaultAsync },
  list: {
    ...defaultAsync,
    data: [],
  },
  selected: undefined,
};

export interface IState {
  account: IAsyncState<Account>;
  formSubmission: IAsyncState<string>;
  list: IAsyncState<Account[]>;
  selected?: Account;
}
