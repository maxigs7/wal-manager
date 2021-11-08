import { createContext, useContext } from 'react';

import { SupabaseClient } from '@supabase/supabase-js';

import { useSupabase } from '@lib/supabase';
import { Account } from '@models/accounts';
import { Category } from '@models/categories';
import { CreditCard } from '@models/credit-cards';
import { Transaction } from '@models/transactions';

import { buildAuthRepository } from './auth';
import { buildRepository } from './repository';
import { IApi } from './types';

const createApi = (db: SupabaseClient): IApi => ({
  accounts: {
    ...buildRepository<Account>(db, 'ACCOUNT'),
  },
  auth: {
    ...buildAuthRepository(db),
  },
  categories: {
    ...buildRepository<Category>(db, 'CATEGORY'),
  },
  creditCards: {
    ...buildRepository<CreditCard>(db, 'CREDIT_CARD'),
  },
  transactions: {
    ...buildRepository<Transaction>(db, 'TRANSACTION'),
  },
});

export const ApiContext = createContext<IApi>({} as IApi);

export const ApiProvider: React.FC = ({ children }) => {
  const supabase = useSupabase();
  const api = createApi(supabase);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = (): IApi => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error(`useApi must be used within a ApiProvider.`);
  }
  return context;
};
