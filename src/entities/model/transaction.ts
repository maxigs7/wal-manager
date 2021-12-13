import { BaseModel } from '@shared';

import { TransactionType } from './transaction-type';

export type Transaction = BaseModel & {
  accountId: string;
  amount: number;
  categoryId: string;
  creditCardId?: string;
  date: Date;
  billedDate?: Date;
  description?: string;
  feeNumber?: number;
  isPaid: boolean;
  type: TransactionType;
  userId: string;
};

export type CreateTransaction = Transaction & {
  createAll: boolean;
};
