import { IRepository } from '@lib';
import { Transaction, TransactionDto, TransactionForm } from '@models';

export interface ITransactionRepository extends IRepository<Transaction> {
  getTransactions(accountId: string, startDate: Date, endDate: Date): Promise<TransactionDto[]>;
  upsert(model: TransactionForm): Promise<Transaction>;
}
