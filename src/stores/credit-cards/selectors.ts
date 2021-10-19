import { CreditCard } from '@app/models/credit-cards';

import { RootState } from '..';
import { IAsyncState } from '../state';

export const selectCreditCard = (state: RootState): IAsyncState<CreditCard> =>
  state.creditCards.creditCard;
export const selectCreditCards = (state: RootState): IAsyncState<CreditCard[]> =>
  state.creditCards.list;
export const selectFormSubmission = (state: RootState): IAsyncState<string> =>
  state.creditCards.formSubmission;
export const selectSelected = (state: RootState): CreditCard | undefined =>
  state.creditCards.selected;
