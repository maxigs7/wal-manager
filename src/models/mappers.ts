import { DEFAULT_CATEGORY_TYPE } from '.';
import { CategoryType } from './category-type';
import { TransactionType } from './transaction-type';

export const toCategoryType = (transactionType: TransactionType): CategoryType => {
  switch (transactionType) {
    case 'expenses':
      return 'expenses';
    case 'incomes':
      return 'incomes';
    default:
      return DEFAULT_CATEGORY_TYPE;
  }
};
