import { BaseModel } from '@lib';

import { AccountType } from './account-type';

export type Account = BaseModel & {
  archivedAt?: Date;
  createdAt: Date;
  isDefault: boolean;
  name: string;
  type: AccountType;
  userId: string;
};
