import { SupabaseError } from '@/lib/supabase';
import { FunctionsArgs, FunctionsName, FunctionsReturns, WalManagerSupabase } from '@/models';

export type RpcReturn = <FName extends FunctionsName>(
  rpcName: FunctionsName,
  args: FunctionsArgs<FName>,
) => Promise<FunctionsReturns<FName>>;

export const rpc = (supabase: WalManagerSupabase): RpcReturn => {
  return async <FName extends FunctionsName>(
    rpcName: FunctionsName,
    args: FunctionsArgs<FName>,
  ) => {
    const { data, error } = await supabase.rpc(rpcName, args);

    if (error) {
      throw new SupabaseError(error);
    }

    return data as unknown as FunctionsReturns<FName>;
  };
};
