import { CreditCardType, BaseModel } from '../common';

export type CreditCard = BaseModel & {
  archivedDate?: Date;
  name: string;
  type: CreditCardType;
  userId: string;
};
