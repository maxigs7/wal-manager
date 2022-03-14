import { Outlet, useRoutes } from 'react-router-dom';

import { LayoutDefault } from '@layout';

import { routes } from './auth';

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
