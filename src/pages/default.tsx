import { Outlet } from 'react-router-dom';

import { lazyImport } from '@shared';

const { LayoutDefault } = lazyImport(
  () => import(/* webpackChunkName: 'default.layout' */ '@shared'),
  'LayoutDefault',
);
export const LayoutDefaultWrapper: React.FC = () => (
  <LayoutDefault>
    <Outlet />
  </LayoutDefault>
);
