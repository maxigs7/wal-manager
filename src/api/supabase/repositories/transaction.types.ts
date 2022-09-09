import { Transaction, TransactionDto, TransactionForm } from '@models';

export interface ITransactionRepository {
  create(model: TransactionForm): Promise<Transaction>;
  getById(id: string, columns?: string): Promise<Transaction>;
  getTransactions(accountId: string, startDate: Date, endDate: Date): Promise<TransactionDto[]>;
  remove(id: string): Promise<Transaction>;
  update(model: TransactionForm): Promise<Transaction>;
  upsert(model: TransactionForm): Promise<Transaction>;
}
