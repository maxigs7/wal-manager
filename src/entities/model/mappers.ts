import { CategoryType } from './category-type';
import { TransactionType } from './transaction-type';

export const toCategoryType = (transactionType: TransactionType): CategoryType => {
  switch (transactionType) {
    case TransactionType.Expense:
      return CategoryType.Expense;
    case TransactionType.Income:
      return CategoryType.Income;
    default:
      return CategoryType.Expense;
  }
};
