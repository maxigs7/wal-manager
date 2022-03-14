import { BaseModel } from '@api';

import { TransactionType } from './transaction-type';

export type Transaction = BaseModel & {
  accountId: string;
  amount: number;
  billedDate?: Date;
  categoryId: string;
  createdAt?: string;
  creditCardId?: string;
  date: Date;
  description?: string;
  feeNumber?: number;
  isPaid: boolean;
  isRecurring: boolean;
  parentTransactionId?: string;
  type: TransactionType;
  userId: string;
};

export type TransactionForm = Transaction & {
  createAll: boolean;
};
