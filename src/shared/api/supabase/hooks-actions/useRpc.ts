import { useCallback } from 'react';

import { SupabaseError, useSupabase } from '@/lib/supabase';
import { FunctionsArgs, FunctionsName, FunctionsReturns } from '@/models';

export type UseRpcReturn = <FName extends FunctionsName>(
  rpcName: FunctionsName,
  args: FunctionsArgs<FName>,
) => Promise<FunctionsReturns<FName>>;

export const useRpc = (): UseRpcReturn => {
  const { supabase } = useSupabase();

  return useCallback(
    async <FName extends FunctionsName>(rpcName: FunctionsName, args: FunctionsArgs<FName>) => {
      const { data, error } = await supabase.rpc(rpcName, args);

      if (error) {
        throw new SupabaseError(error);
      }

      return data as unknown as FunctionsReturns<FName>;
    },
    [supabase],
  );
};
