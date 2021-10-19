import { CreditCard } from '@app/models/credit-cards';

import { defaultAsync, IAsyncState } from '../state';

export const initialState: IState = {
  creditCard: { ...defaultAsync },
  formSubmission: { ...defaultAsync },
  list: {
    ...defaultAsync,
    data: [],
  },
  selected: undefined,
};

export interface IState {
  creditCard: IAsyncState<CreditCard>;
  formSubmission: IAsyncState<string>;
  list: IAsyncState<CreditCard[]>;
  selected?: CreditCard;
}
