import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Session, User } from '@supabase/supabase-js';

import { Rows, Schema, TablesName } from '@/models';

export type Count = 'exact' | 'planned' | 'estimated';

export type Filter<TName extends TablesName, Row extends Rows<TName>, Result = Row> = (
  query: PostgrestFilterBuilder<Schema, Rows<TName>, Result>,
) => PostgrestFilterBuilder<Schema, Row, Result>;

export type Sort = {
  ascending?: boolean;
  field: string;
  foreignTable?: string;
  nullsFirst?: boolean;
};

export type PostgrestError = {
  code: string;
  details: string;
  hint: string;
  message: string;
};

export type Returning = 'minimal' | 'representation';

export type UserSession = { session: Session | null; user: User | null };
