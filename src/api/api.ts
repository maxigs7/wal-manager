import { SupabaseClient } from '@supabase/supabase-js';

import { authRepository, IAuthRepository } from '@m/auth';
import { ITransactionRepository, transactionRepository } from '@m/transaction';
import { Account, Category, CreditCard } from '@models';

import { genericRepository } from './repository';
import { IRepository } from './types';

export interface IApi {
  accounts: IRepository<Account>;
  auth: IAuthRepository;
  categories: IRepository<Category>;
  creditCards: IRepository<CreditCard>;
  transactions: ITransactionRepository;
}

const createApi = (db: SupabaseClient): IApi => ({
  accounts: genericRepository<Account>(db, 'account'),
  auth: authRepository(db),
  categories: genericRepository<Category>(db, 'category'),
  creditCards: genericRepository<CreditCard>(db, 'credit_card'),
  transactions: transactionRepository(db),
});

export default createApi;
