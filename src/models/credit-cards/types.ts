import { CreditCardType, BaseModel } from '../common';

export type CreditCard = BaseModel & {
  accountId: string;
  archivedDate?: Date;
  closedDay?: number;
  name: string;
  type: CreditCardType;
  userId: string;
};
