import { SupabaseClient } from '@supabase/supabase-js';
import { addMonths, format, parseISO } from 'date-fns';

import { ApiError } from '@lib';
import { Transaction, TransactionDto, TransactionForm } from '@models';

import { ITransactionRepository } from './transaction.types';

const tableName = 'transaction';

export class TransactionRepository implements ITransactionRepository {
  constructor(private supabase: SupabaseClient) {}

  private get from() {
    return this.supabase.from(tableName);
  }

  create = async (form: TransactionForm): Promise<Transaction> => {
    const transactions = this.toTransactions(form);
    const { data, error } = await this.from.insert(this.cleanToServer(transactions)).select();
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return this.parseTransaction(data)[0];
  };

  getById = async (id: string, columns?: string): Promise<Transaction> => {
    const { data, error } = await this.from.select(columns).match({ id });
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return this.parseTransaction(data)[0];
  };

  getTransactions = async (
    accountId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<TransactionDto[]> => {
    const { data, error } = await this.supabase.rpc('get_transactions', {
      accId: accountId,
      startDate: format(startDate, 'yyyy-MM-dd') + 'T00:00:00.000Z',
      endDate: format(endDate, 'yyyy-MM-dd') + 'T23:59:59.999Z',
    });
    if (error) {
      throw new Error(JSON.stringify(error));
    }
    return this.toDto(data);
  };

  update = async ({
    createAll: _createAll,
    ...transaction
  }: TransactionForm): Promise<Transaction> => {
    const { data, error } = await this.from
      .update(this.cleanToServer(transaction))
      .match({ id: transaction.id })
      .select();

    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return this.parseTransaction(data)[0];
  };

  remove = async (id: string): Promise<Transaction> => {
    const { data, error } = await this.from.delete().match({ id }).select();
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return this.cleanFromServer(data[0]) as Transaction;
  };

  upsert = (model: TransactionForm): Promise<Transaction> => {
    if (!model.id) {
      return this.create(model);
    }

    return this.update(model);
  };

  //#region Utilities

  private toTransactions = ({ createAll, ...transaction }: TransactionForm): any[] => {
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

  private parseTransaction = (data: any[] | null): Transaction[] => {
    if (!data) return [];

    const cleanData = this.cleanFromServer(data);
    return cleanData.map(
      (t: any) =>
        ({
          ...t,
          date: parseISO(t.date),
          billedDate: t.billedDate ? parseISO(t.billedDate) : undefined,
        } as Transaction),
    );
  };

  private toDto = (data: any[] | null): TransactionDto[] => {
    if (!data) return [];

    const cleanData = this.cleanFromServer(data);
    return cleanData.map(
      (t: any) =>
        ({
          ...t,
          date: parseISO(t.date),
        } as TransactionDto),
    );
  };

  private isUndefinedSafe(obj: any, key: string) {
    return typeof obj[key] === 'undefined' || obj[key] === '';
  }

  private isNullSafe(obj: any, key: string) {
    return obj[key] === null;
  }

  protected cleanFromServer(obj: any, cleanNull = true): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => this.cleanFromServer(v));
    } else if (obj != null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [key]:
            cleanNull && this.isNullSafe(obj, key) ? undefined : this.cleanFromServer(obj[key]),
        }),
        {},
      );
    }
    return obj;
  }

  protected cleanToServer(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => this.cleanToServer(v));
    } else if (obj != null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [key]: this.isUndefinedSafe(obj, key) ? null : this.cleanToServer(obj[key]),
        }),
        {},
      );
    }
    return obj;
  }

  //#endregion
}
