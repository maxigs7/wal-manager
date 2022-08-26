import { BaseModel } from '@lib';

import { CreditCardType } from './credit-card-type';

export type CreditCard = BaseModel & {
  archivedAt?: Date;
  createdAt: Date;
  name: string;
  type: CreditCardType;
  userId: string;
};
