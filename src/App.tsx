import React, { Suspense } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { PageLoader } from './modules/common';
import { LazyAdminLayout, LazyDefaultLayout } from './modules/layouts';

const App: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <Switch>
      <Route component={LazyDefaultLayout} path="/auth" />
      <Route component={LazyAdminLayout} path="/" />
    </Switch>
  </Suspense>
);

export default App;
