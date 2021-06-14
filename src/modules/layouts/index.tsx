import React from 'react';

export const LazyAdminLayout = React.lazy(
  () => import(/* webpackChunkName: 'admin.layout' */ '@app/modules/layouts/admin'),
);
export const LazyDefaultLayout = React.lazy(
  () => import(/* webpackChunkName: 'default.layout' */ '@app/modules/layouts/default'),
);
