import { IconName } from '@fortawesome/fontawesome-common-types';

import { TransactionType } from './transaction-type';

export type CategoryTotalItem = {
  amount: number;
  rootCategory: string;
  rootCategoryColor: string;
  rootCategoryIcon: IconName;
  rootCategoryId: string;
  subCategory?: string;
  subCategoryId?: string;
  total: number;
  type: TransactionType;
};
