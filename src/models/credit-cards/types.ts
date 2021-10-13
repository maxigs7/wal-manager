import { CreditCardType, BaseModel } from '../common';

export type CreditCard = BaseModel & {
  archivedDate?: Date;
  closedDay?: number;
  name: string;
  type: CreditCardType;
  userId: string;
};
