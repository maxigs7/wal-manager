import compose from 'compose-function';

import { withAuth } from './with-auth';
import { withAuthCheck } from './with-auth-check';
import { withChakra } from './with-chakra';
import { withDolarsiClient } from './with-dolarsi-client';
import { withFonts } from './with-fonts';
import { withReactQuery } from './with-react-query';
import { withSupabase } from './with-supabase';

export const withProviders = compose(
  withReactQuery,
  withFonts,
  withChakra,
  withSupabase,
  withAuth,
  withAuthCheck,
  withDolarsiClient,
);
