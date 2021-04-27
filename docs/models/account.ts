import { Entity } from './models';

export enum AccountType {
  Bank = 'bank',
  Wallet = 'wallet',
}

export type Account = Entity & {
  accountType: AccountType;
  archivedDate?: Date;
  name: string;
  userId: string;
};
