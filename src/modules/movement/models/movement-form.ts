import { MovementType, Currency } from '@/models';

export interface MovementForm {
  accountId: string;
  amount: number;
  categoryId: string;
  creditCardId?: string;
  date: Date;
  description?: string;
  id: string;
  investmentId?: string;
  isPaid: boolean;
  month: number;
  type: MovementType;
  userId: string;
  year: number;
  // EXTRAS
  amountValue?: number;
  createAll: boolean;
  currency?: Currency;
  destinationAccountId?: string;
  feeNumber?: number;
  quotationAmount?: number;
}

export const NON_EDITABLE_FIELD: (keyof MovementForm)[] = [
  'type',
  'accountId',
  'feeNumber',
  'destinationAccountId',
];
