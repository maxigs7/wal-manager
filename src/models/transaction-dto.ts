import { IconName } from '@fortawesome/fontawesome-common-types';

import { BaseModel } from '@lib';

import { CreditCardType } from './credit-card-type';
import { TransactionType } from './transaction-type';

export type TransactionDto = BaseModel & {
  account: string;
  amount: number;
  creditCard?: string;
  creditCardId?: string;
  creditCardType?: CreditCardType;
  date: Date;
  description?: string;
  feeNumber?: number;
  isPaid: boolean;
  rootCategory: string;
  rootCategoryColor: string;
  rootCategoryIcon: IconName;
  rootCategoryId: string;
  subCategory?: string;
  subCategoryId?: string;
  type: TransactionType;
};
