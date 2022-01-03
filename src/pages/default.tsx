import { Outlet, useRoutes } from 'react-router-dom';

import { LayoutDefault } from '@shared';

import { routes } from './routing/auth';

export default () => {
  const element = useRoutes(routes);

  return (
    <LayoutDefault>
      {element}
      <Outlet />
    </LayoutDefault>
  );
};
