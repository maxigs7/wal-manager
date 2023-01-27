import compose from 'compose-function';

import { withAuth } from './with-auth';
import { withAuthCheck } from './with-auth-check';
import { withChakra } from './with-chakra';
import { withDolarsiClient } from './with-dolarsi-client';
import { withReactQuery } from './with-react-query';
import { withSupabase } from './with-supabase';

export const withProviders = compose(
  withReactQuery,
  withChakra,
  withSupabase,
  withAuth,
  withAuthCheck,
  withDolarsiClient,
);
