import { CreditCard } from '@app/models/credit-cards';

import { defaultAsync, IAsyncState } from '../state';

export const initialState: IState = {
  creditCard: { ...defaultAsync },
  creditCardAction: { ...defaultAsync },
  creditCards: {
    ...defaultAsync,
    data: [],
  },
  selected: undefined,
};

export interface IState {
  creditCard: IAsyncState<CreditCard>;
  creditCardAction: IAsyncState<string>;
  creditCards: IAsyncState<CreditCard[]>;
  selected?: CreditCard;
}
