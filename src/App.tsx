import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { PageLoader } from '@app/components/loaders';

const App: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <Switch>
      <Route
        component={lazy(
          () => import(/* webpackChunkName: 'default.layout' */ '@app/layouts/default'),
        )}
        path="/auth"
      />
      <Route
        component={lazy(() => import(/* webpackChunkName: 'admin.layout' */ '@app/layouts/admin'))}
        path="/"
      />
    </Switch>
  </Suspense>
);

export default App;
