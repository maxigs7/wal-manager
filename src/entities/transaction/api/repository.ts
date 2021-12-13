import { SupabaseClient } from '@supabase/supabase-js';

import { Transaction, TransactionDto } from '@entities';
import { camelCase, genericRepository } from '@shared';

import { ITransactionRepository } from './types';

export const transactionRepository = (db: SupabaseClient): ITransactionRepository => {
  return {
    ...genericRepository<Transaction>(db, 'transaction'),
    getTransactions: async (startDate: Date, endDate: Date): Promise<TransactionDto[]> => {
      const { data, error } = await db.rpc('get_transactions', {
        start_date: startDate,
        end_date: endDate,
      });
      if (error) {
        throw new Error(JSON.stringify(error));
      }
      return data ? (camelCase(data) as TransactionDto[]) : [];
    },
  };
};
