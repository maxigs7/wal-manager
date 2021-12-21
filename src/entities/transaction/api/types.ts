import { Transaction, TransactionDto, TransactionForm } from '@entities';
import { IRepository } from '@shared';

export interface ITransactionRepository extends IRepository<Transaction> {
  getTransactions(startDate: Date, endDate: Date): Promise<TransactionDto[]>;
  upsert(model: TransactionForm): Promise<Transaction>;
}
