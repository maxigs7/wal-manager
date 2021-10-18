import { Account } from '@app/models/accounts';

import { RootState } from '..';
import { IAsyncState } from '../state';

export const selectAccounts = (state: RootState): IAsyncState<Account[]> => state.accounts.accounts;
