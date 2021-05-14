import React from 'react';
import { RouteProps } from 'react-router-dom';

import AdminLayout from '@app/layouts/admin';

import PrivateRoute from './private.route';

const AdminRoute: React.FC<RouteProps> = (props: RouteProps) => (
  <AdminLayout>
    <PrivateRoute {...props} />
  </AdminLayout>
);

export default AdminRoute;
