import { BaseModel } from '@shared';

import { TransactionType } from './transaction-type';

export type Transaction = BaseModel & {
  accountId: string;
  amount: number;
  billedDate?: string;
  categoryId: string;
  createdAt?: string;
  creditCardId?: string;
  date: string;
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
