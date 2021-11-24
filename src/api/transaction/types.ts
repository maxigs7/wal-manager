import { Transaction, TransactionDto } from '@models';

import { IRepository } from '../types';

export interface ITransactionRepository extends IRepository<Transaction> {
  getTransactions(startDate: Date, endDate: Date): Promise<TransactionDto[]>;
}
