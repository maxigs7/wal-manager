import { SupabaseClient } from '@supabase/supabase-js';

import { buildRepository } from '@api/repository';
import { camelCase } from '@api/util';
import { Transaction, TransactionDto } from '@models';

import { ITransactionRepository } from './types';

export const buildTransactionRepository = (db: SupabaseClient): ITransactionRepository => {
  return {
    ...buildRepository<Transaction>(db, 'TRANSACTION'),
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
