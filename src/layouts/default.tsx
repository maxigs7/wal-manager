import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { PageLoader } from '@app/components/loaders';
import { defaultRoutes } from '@app/routes/default.route';

const DefaultLayout: React.FC = () => (
  <section className="bg-indigo-600 h-screen">
    <div className="mx-auto flex justify-center lg:items-center h-full">
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {defaultRoutes.map((route, index) => (
            <Route {...route} key={index} />
          ))}
          <Redirect from="/auth" to="/auth/login" exact />
        </Switch>
      </Suspense>
    </div>
  </section>
);

export default DefaultLayout;
