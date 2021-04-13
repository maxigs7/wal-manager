import { Account } from './account';
import { Category, SubCategory } from './category';
import { CreditCard } from './credit-card';
import { Entity } from './models';
import { TransactionType } from './transaction-type';

export type Transaction = Entity & {
  account?: Account;
  amount: number;
  billingDate: Date;
  category: Category;
  creditCard?: CreditCard;
  date: Date;
  feeNumber?: number;
  isPaid: boolean;
  name: string;
  subcategory?: SubCategory;
  transactionType: TransactionType;
  userId: string;
};
