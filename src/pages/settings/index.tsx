import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { CardContainer } from '@app/components/ui';
import PrivateRoute from '@app/routes/private.route';
import { settingsRoutes } from '@app/routes/settings.route';

const SettingsPage: React.FC = () => (
  <>
    <h1>Settings</h1>
    <p>Settings</p>
    <CardContainer>
      <Suspense fallback={() => 'Loading...'}>
        <Switch>
          {settingsRoutes.map((route, index) => (
            <PrivateRoute {...route} key={index} />
          ))}
          <Redirect from="/settings" to="/settings/profile" exact />
        </Switch>
      </Suspense>
    </CardContainer>
  </>
);

export default SettingsPage;
