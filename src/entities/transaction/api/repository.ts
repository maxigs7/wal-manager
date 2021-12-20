import { SupabaseClient } from '@supabase/supabase-js';
import { addMonths, format } from 'date-fns';

import { Transaction, TransactionDto, TransactionForm } from '@entities';
import { ApiError, genericRepository, snakeCase } from '@shared';

import { dtoSerializer, serializer } from './serializer';
import { ITransactionRepository } from './types';

const tableName = 'transaction';

export const transactionRepository = (db: SupabaseClient): ITransactionRepository => {
  const generic = genericRepository<Transaction>(db, tableName);
  return {
    ...generic,
    create: async ({ createAll, ...transaction }: TransactionForm): Promise<Transaction> => {
      const transactions: Transaction[] = [];
      if (createAll && transaction.feeNumber && transaction.feeNumber > 1) {
        for (let i = 0; i < transaction.feeNumber; i++) {
          const feeText = `${i + 1}/${transaction.feeNumber}`;
          transactions.push({
            ...transaction,
            description: transaction.description
              ? `${transaction.description} ${feeText}`
              : feeText,
            date: addMonths(transaction.date, i),
            feeNumber: i + 1,
          });
        }
      } else {
        transactions.push(transaction);
      }

      const { data, error } = await db.from(tableName).insert(snakeCase(transactions));
      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return serializer(data)[0];
    },
    getById: async (id: string, columns?: string): Promise<Transaction> => {
      const { data, error } = await db.from(tableName).select(columns).match({ id });
      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return serializer(data)[0];
    },
    getTransactions: async (startDate: Date, endDate: Date): Promise<TransactionDto[]> => {
      const { data, error } = await db.rpc('get_transactions', {
        start_date: format(startDate, 'yyyy-MM-dd') + 'T00:00:00.000Z',
        end_date: format(endDate, 'yyyy-MM-dd') + 'T23:59:59.999Z',
      });
      if (error) {
        throw new Error(JSON.stringify(error));
      }
      return dtoSerializer(data);
    },
    update: async ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      createAll: _createAll,
      ...transaction
    }: TransactionForm): Promise<Transaction> => {
      const { data, error } = await db
        .from(tableName)
        .update(snakeCase(transaction))
        .match({ id: transaction.id });

      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }
      return serializer(data)[0];
    },
  };
};
