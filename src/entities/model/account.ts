import { BaseModel } from '@shared';

import { AccountType } from './account-type';

export type Account = BaseModel & {
  archivedDate?: Date;
  createdDate: Date;
  name: string;
  type: AccountType;
  userId: string;
};
