import { AuthError, PostgrestError } from '@supabase/supabase-js';

export class SupabaseError extends Error {
  public code: string;
  public details: string;
  public hint: string;

  constructor(error: PostgrestError | AuthError) {
    const postgrestError = error as PostgrestError;
    super(error.message);
    this.code = postgrestError?.code;
    this.details = postgrestError?.details;
    this.hint = postgrestError?.hint;
  }
}
