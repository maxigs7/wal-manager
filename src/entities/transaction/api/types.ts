import { Transaction, TransactionDto } from '@entities';
import { IRepository } from '@shared';

export interface ITransactionRepository extends IRepository<Transaction> {
  getTransactions(startDate: Date, endDate: Date): Promise<TransactionDto[]>;
}
