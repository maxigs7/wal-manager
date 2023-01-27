import { CreditCardType } from '@/models';

export type CreditCardSummary = {
  amount: number;
  cc: string;
  type: CreditCardType;
};
