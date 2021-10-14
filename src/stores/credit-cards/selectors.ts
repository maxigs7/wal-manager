import { CreditCard } from '@app/models/credit-cards';

import { RootState } from '..';
import { IAsyncState } from '../state';

export const selectCreditCards = (state: RootState): IAsyncState<CreditCard[]> =>
  state.creditCards.creditCards;

export const selectSelectedCreditCard = (state: RootState): CreditCard | undefined =>
  state.creditCards.selected;
