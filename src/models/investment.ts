import { BaseModel } from '@lib';

import { InvestmentType } from './investment-type';

export type Investment = BaseModel & {
  accountId: string;
  amount: number;
  annualPercentage?: number;
  createdAt: Date;
  dueDate?: Date;
  name: string;
  profit?: number;
  type: InvestmentType;
  userId: string;
};
