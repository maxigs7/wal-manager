import { SupabaseClient } from '@supabase/supabase-js';

import { FunctionsArgs, FunctionsReturns, Inserts, Rows, Updates } from './database.extension';
import { Database } from './database.schema';

export type WalManagerSupabase = SupabaseClient<Database>;

export type Account = Rows<'account'>;
export type AccountInsert = Inserts<'account'>;
export type AccountUpdate = Updates<'account'>;
export type Category = Rows<'category'>;
export type CategoryInsert = Inserts<'category'>;
export type CategoryUpdate = Updates<'category'>;
export type CreditCard = Rows<'creditCard'>;
export type CreditCardInsert = Inserts<'creditCard'>;
export type CreditCardUpdate = Updates<'creditCard'>;
export type Investment = Rows<'investment'>;
export type InvestmentInsert = Inserts<'investment'>;
export type InvestmentUpdate = Updates<'investment'>;
export type MovementFee = Rows<'movementFee'>;
export type Movement = Rows<'movement'>;
export type MovementInsert = FunctionsArgs<'insertMovement'>;
export type MovementUpdate = FunctionsArgs<'updateMovement'>;
export type Quotation = Rows<'quotation'>;
export type Transfer = Rows<'transfer'>;
export type GetMovementArgs = FunctionsArgs<'getMovements'>;
export type GetMovementItem = FunctionsReturns<'getMovements'>[number];
export type GetMovementSummaryArgs = FunctionsArgs<'getMovementsSummary'>;
export type GetMovementSummaryItem = FunctionsReturns<'getMovementsSummary'>[number];
