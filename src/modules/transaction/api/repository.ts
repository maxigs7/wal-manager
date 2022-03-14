import { SupabaseClient } from '@supabase/supabase-js';
import { addMonths, format } from 'date-fns';

import { ApiError, genericRepository } from '@api';
import { snakeCase } from '@lib';
import { Transaction, TransactionDto, TransactionForm } from '@models';

import { dtoSerializer, serializer } from './serializer';
import { ITransactionRepository } from './types';

const tableName = 'transaction';

const builder = ({ createAll, ...transaction }: TransactionForm): any[] => {
  if (!createAll || transaction.id || !transaction.feeNumber || transaction.feeNumber === 1) {
    if (!transaction.id) {
      delete (transaction as any).id;
    }
    return [transaction];
  }

  return [...Array(transaction.feeNumber)].map((_v, i) => {
    const feeText = `${i + 1}/${transaction.feeNumber}`;
    const t: any = {
      ...transaction,
      description: transaction.description ? `${transaction.description} ${feeText}` : feeText,
      date: addMonths(transaction.date, i),
      feeNumber: i + 1,
    };
    delete t.id;
    return t;
  });
};

export const transactionRepository = (db: SupabaseClient): ITransactionRepository => {
  const { getAll, remove } = genericRepository<Transaction>(db, tableName);

  const create = async (form: TransactionForm): Promise<Transaction> => {
    const transactions = builder(form);
    const { data, error } = await db.from(tableName).insert(snakeCase(transactions));
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return serializer(data)[0];
  };
  const update = async ({
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
  };

  return {
    create,
    getAll,
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

    remove,
    update,

    upsert: (form: TransactionForm): Promise<Transaction> => {
      if (!form.id) {
        return create(form);
      }

      return update(form);
    },
  };
};
