import { Outlet, useRoutes } from 'react-router-dom';

import { LayoutDefault } from '@shared';

import { routes } from './routing/auth';

const Layout: React.FC = () => {
  const element = useRoutes(routes);

  return (
    <LayoutDefault>
      {element}
      <Outlet />
    </LayoutDefault>
  );
};

export default Layout;
