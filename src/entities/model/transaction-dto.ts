import { IconName } from '@fortawesome/fontawesome-common-types';

import { BaseModel } from '@shared';

import { TransactionType } from './transaction-type';

export type TransactionDto = BaseModel & {
  account: string;
  amount: number;
  rootCategory: string;
  rootCategoryColor: string;
  rootCategoryIcon: IconName;
  subCategory?: string;
  creditCard?: string;
  date: string;
  description?: string;
  feeNumber?: number;
  isPaid: boolean;
  transactionType: TransactionType;
};
