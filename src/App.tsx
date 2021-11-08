import React, { Suspense } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { LazyAdminLayout, LazyDefaultLayout } from '@layouts';
import { useUser } from '@lib/supabase';
import { PageLoader } from '@lib/wal-ui';

const AuthWrapper: React.FC = ({ children }) => {
  const { initializing } = useUser();

  if (initializing) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

const App: React.FC = () => (
  <AuthWrapper>
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route component={LazyDefaultLayout} path="/auth" />
        <Route component={LazyAdminLayout} path="/" />
      </Switch>
    </Suspense>
  </AuthWrapper>
);

export default App;
