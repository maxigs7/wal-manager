import { SupabaseClient } from '@supabase/supabase-js';

import { genericRepository } from '@api';
import { ApiError, IRepository } from '@lib';
import { Account } from '@models';

const tableName = 'account';

export const accountRepository = (db: SupabaseClient): IRepository<Account> => {
  const repository = genericRepository<Account>(db, tableName);

  const remove = async (id: string): Promise<Account> => {
    const { data, error } = await db.rpc('delete_account', {
      id,
    });
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return data[0] as Account;
  };

  return {
    ...repository,
    remove,
  };
};
