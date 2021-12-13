import { BaseModel } from '@shared';

import { CreditCardType } from './credit-card-type';

export type CreditCard = BaseModel & {
  archivedDate?: Date;
  name: string;
  type: CreditCardType;
  userId: string;
};
