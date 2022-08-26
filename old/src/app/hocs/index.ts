import compose from 'compose-function';

import { withApi } from './with-api';
import { withAuth } from './with-auth';
import { withAuthCheck } from './with-auth-check';
import { withChakra } from './with-chakra';
import { withHelmet } from './with-helmet';
import { withReactQuery } from './with-react-query';
import { withRouter } from './with-router';
import { withSupabase } from './with-supabase';

export const withProviders = compose(
  withRouter,
  withReactQuery,
  withHelmet,
  withChakra,
  withSupabase,
  withApi,
  withAuth,
  withAuthCheck,
);
