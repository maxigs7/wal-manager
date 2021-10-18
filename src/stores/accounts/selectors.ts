import { Account } from '@app/models/accounts';

import { RootState } from '..';
import { IAsyncState } from '../state';

export const selectAccount = (state: RootState): IAsyncState<Account> => state.accounts.account;
export const selectAccounts = (state: RootState): IAsyncState<Account[]> => state.accounts.list;
export const selectFormSubmission = (state: RootState): IAsyncState<string> =>
  state.accounts.formSubmission;
export const selectSelected = (state: RootState): Account | undefined => state.accounts.selected;
