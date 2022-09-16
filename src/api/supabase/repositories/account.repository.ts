import { SupabaseClient } from '@supabase/supabase-js';

import { ApiError, cleanFromServer, GenericRepository } from '@lib';
import { Account } from '@models';

const tableName = 'account';

export class AccountRepository extends GenericRepository<Account> {
  constructor(supabase: SupabaseClient) {
    super(supabase, tableName);
  }

  remove = async (id: string): Promise<Account> => {
    const { data, error } = await this.supabase.rpc('delete_account', {
      id,
    });
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return cleanFromServer(data[0]) as Account;
  };
}
