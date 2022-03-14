import { BaseModel } from '@api';

import { AccountType } from './account-type';

export type Account = BaseModel & {
  archivedDate?: Date;
  createdDate: Date;
  isDefault: boolean;
  name: string;
  type: AccountType;
  userId: string;
};
