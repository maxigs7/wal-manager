import { TransactionType } from './transaction-type';
import { Entity } from './models';

type CategoryBase = {
  isActive: boolean;
  name: string;
};

export type SubCategory = Entity & CategoryBase;

export type Category = Entity &
  CategoryBase & {
    transactionType: TransactionType;
    color: string;
    icon: string;
    subCategories?: SubCategory[];
    userId: string;
  };
