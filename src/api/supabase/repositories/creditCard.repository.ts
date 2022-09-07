import { SupabaseClient } from '@supabase/supabase-js';

import { ApiError, GenericRepository } from '@lib';
import { CreditCard } from '@models';

const tableName = 'creditCard';

export class CreditCardRepository extends GenericRepository<CreditCard> {
  constructor(supabase: SupabaseClient) {
    super(supabase, tableName);
  }

  remove = async (id: string): Promise<CreditCard> => {
    const { data, error } = await this.supabase.rpc('delete_creditcard', {
      id,
    });
    if (error) {
      throw new ApiError(error);
    }
    if (!data) {
      throw new Error('Not Found');
    }
    return data[0] as CreditCard;
  };
}
