import React from 'react';
import { Switch } from 'react-router';
import { Redirect } from 'react-router-dom';

import { LoginPage } from '@app/pages/auth/login';
import DashboardPage from '@app/pages/dashboard/index';
import { NotFoundPage } from '@app/pages/not-found';
import CategoriesPage from '@app/pages/settings/categories';
import { AdminRoute, DefaultRoute } from '@app/routes';

const App: React.FC = () => {
  return (
    <Switch>
      <DefaultRoute path="/auth/login">
        <LoginPage />
      </DefaultRoute>

      <AdminRoute path="/dashboard">
        <DashboardPage />
      </AdminRoute>

      <AdminRoute path="/settings/categories">
        <CategoriesPage />
      </AdminRoute>

      <DefaultRoute path="/404">
        <NotFoundPage />
      </DefaultRoute>
      <Redirect from="*" to="/404" />
    </Switch>
  );
};

export default App;
