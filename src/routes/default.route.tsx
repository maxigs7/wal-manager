import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import DefaultLayout from '@app/layouts/default';

const DefaultRoute: React.FC<RouteProps> = (props: RouteProps) => (
  <DefaultLayout>
    <Route {...props} />
  </DefaultLayout>
);

export default DefaultRoute;
