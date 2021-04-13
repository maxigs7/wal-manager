import { Entity } from './models';

export enum CreditCardType {
  amex = 'amex',
  carrefour = 'carrefour',
  mastercard = 'mastercard',
  visa = 'visa',
}

export type CreditCard = Entity & {
  accountId: string;
  archivedDate?: Date;
  closedDay: number;
  name: string;
  type: CreditCardType;
  userId: string;
};
