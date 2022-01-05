import { SupabaseClient } from '@supabase/supabase-js';

import {
  Account,
  authRepository,
  Category,
  CreditCard,
  IAuthRepository,
  ITransactionRepository,
  transactionRepository,
} from '@entities';
import { genericRepository, IRepository } from '@shared';

export interface IApi {
  accounts: IRepository<Account>;
  auth: IAuthRepository;
  categories: IRepository<Category>;
  creditCards: IRepository<CreditCard>;
  transactions: ITransactionRepository;
}

const api = (db: SupabaseClient): IApi => ({
  accounts: {
    ...genericRepository<Account>(db, 'account'),
  },
  auth: {
    ...authRepository(db),
  },
  categories: {
    ...genericRepository<Category>(db, 'category'),
  },
  creditCards: {
    ...genericRepository<CreditCard>(db, 'credit_card'),
  },
  transactions: {
    ...transactionRepository(db),
  },
});

export default api;
