import { TransactionType, BaseModel } from '../common';

export type Transaction = BaseModel & {
  accountId: string;
  amount: number;
  categoryId: string;
  creditCardId?: string;
  date: Date;
  description?: string;
  feeNumber?: number;
  isPaid: boolean;
  transactionType: TransactionType;
  userId: string;
};
