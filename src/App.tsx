import React, { Suspense } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { LazyAdminLayout, LazyDefaultLayout } from '@app/layouts';
import { PageLoader } from '@lib/wal-ui';

const App: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <Switch>
      <Route component={LazyDefaultLayout} path="/auth" />
      <Route component={LazyAdminLayout} path="/" />
    </Switch>
  </Suspense>
);

export default App;
