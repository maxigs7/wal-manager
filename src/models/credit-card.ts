import { BaseModel } from '@lib';

import { CreditCardType } from './credit-card-type';

export type CreditCard = BaseModel & {
  archivedDate?: Date;
  createdDate: Date;
  isDefault: boolean;
  name: string;
  type: CreditCardType;
  userId: string;
};
