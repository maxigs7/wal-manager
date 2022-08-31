import compose from 'compose-function';

import { withAuth } from './with-auth';
import { withAuthCheck } from './with-auth-check';
import { withChakra } from './with-chakra';
import { withReactQuery } from './with-react-query';
import { withSupabase } from './with-supabase';
import { withSupabaseApi } from './with-supabase-api';

export const withProviders = compose(
  withReactQuery,
  withChakra,
  withSupabase,
  withSupabaseApi,
  withAuth,
  withAuthCheck,
);
