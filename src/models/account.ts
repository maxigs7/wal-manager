import { BaseModel } from '@lib';

import { AccountType } from './account-type';
import { Currency } from './currency';

export type Account = BaseModel & {
  archivedAt?: Date;
  createdAt: Date;
  currency: Currency;
  initialAmount?: number;
  isDefault: boolean;
  name: string;
  type: AccountType;
  userId: string;
};
