import React, { Suspense } from 'react';
import { Switch } from 'react-router';
import { Redirect } from 'react-router-dom';

import { PageLoader } from '@app/components/loaders';
import { routes } from '@app/routes';

const App: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <Switch>
      {routes.map(({ Route, Component, props }, index) => (
        <Route {...props} key={index}>
          <Component />
        </Route>
      ))}

      <Redirect from="/" to="/dashboard" exact />
      <Redirect from="*" to="/404" />
    </Switch>
  </Suspense>
);

export default App;
