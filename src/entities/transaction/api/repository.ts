import { SupabaseClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

import { Transaction, TransactionDto } from '@entities';
import { camelCase, genericRepository } from '@shared';

import { ITransactionRepository } from './types';

export const transactionRepository = (db: SupabaseClient): ITransactionRepository => {
  return {
    ...genericRepository<Transaction>(db, 'transaction'),
    getTransactions: async (startDate: Date, endDate: Date): Promise<TransactionDto[]> => {
      const { data, error } = await db.rpc('get_transactions', {
        start_date: format(startDate, 'yyyy-MM-dd') + 'T00:00:00.000Z',
        end_date: format(endDate, 'yyyy-MM-dd') + 'T23:59:59.999Z',
      });
      if (error) {
        throw new Error(JSON.stringify(error));
      }
      return data ? (camelCase(data) as TransactionDto[]) : [];
    },
  };
};
