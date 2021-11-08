import { AccountType, BaseModel } from '../common';

export type Account = BaseModel & {
  archivedDate?: Date;
  createdDate: Date;
  name: string;
  type: AccountType;
  userId: string;
};
