import { SupabaseClient } from '@supabase/supabase-js';

import { genericRepository } from '@api';
import { ApiError, IRepository } from '@lib';
import { CreditCard } from '@models';

const tableName = 'creditCard';

export const creditCardRepository = (db: SupabaseClient): IRepository<CreditCard> => {
  const repository = genericRepository<CreditCard>(db, tableName);

  const remove = async (id: string): Promise<CreditCard> => {
    const { data, error } = await db.rpc('delete_creditCard', {
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

  return {
    ...repository,
    remove,
  };
};
