import { IconName } from '@fortawesome/fontawesome-common-types';

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

export type TransactionDto = BaseModel & {
  account: string;
  amount: number;
  rootCategory: string;
  rootCategoryColor: string;
  rootCategoryIcon: IconName;
  subCategory?: string;
  creditCard: string;
  date: Date;
  description?: string;
  feeNumber?: number;
  isPaid: boolean;
  transactionType: TransactionType;
};
