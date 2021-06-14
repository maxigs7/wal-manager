import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { PageLoader } from '@app/modules/common';
import { defaultRoutes } from '@app/routes/default.route';

const DefaultLayout: React.FC = () => (
  <section className="bg-primary-900 h-screen">
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
