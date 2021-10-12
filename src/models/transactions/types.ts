import { TransactionType, BaseModel } from '../common';

export type Transaction = BaseModel & {
  accountId: string;
  amount: number;
  billingDate: Date;
  categoryId: string;
  creditCardId?: string;
  date: Date;
  feeNumber?: number;
  isPaid: boolean;
  name: string;
  transactionType: TransactionType;
  userId: string;
};
