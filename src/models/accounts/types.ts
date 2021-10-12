import { AccountType, BaseModel } from '../common';

export type Account = BaseModel & {
  accountType: AccountType;
  archivedDate?: Date;
  name: string;
  userId: string;
};
