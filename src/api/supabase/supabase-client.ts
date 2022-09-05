import { SupabaseClient as OrigSupabaseClient } from '@supabase/supabase-js';

import { GenericRepository, IGenericRepository } from '@lib';
import { Account, Category } from '@models';

import { AccountRepository, AuthRepository, IAuthRepository } from './repositories';

export interface ISupabaseClient {
  accounts: IGenericRepository<Account>;
  auth: IAuthRepository;
  categories: IGenericRepository<Category>;
  // creditCards: IRepository<CreditCard>;
  // transactions: ITransactionRepository;
}

export class SupabaseClient implements ISupabaseClient {
  public accounts: IGenericRepository<Account>;
  public auth: IAuthRepository;
  public categories: IGenericRepository<Category>;
  // public creditCards: IGenericRepository<CreditCard>;
  // public transactions: IGenericRepository<Transaction>;

  constructor(private db: OrigSupabaseClient) {
    // TODO: Instance Repo when has been called.
    this.accounts = new AccountRepository(this.db);
    this.auth = new AuthRepository(this.db);
    this.categories = new GenericRepository<Category>(this.db, 'category');
    // this.creditCards = new GenericRepository<Category>(db, 'creditCard');
    // this.transactions = new GenericRepository<Category>(db, 'transaction');
  }
}
