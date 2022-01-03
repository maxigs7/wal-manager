import React from 'react';
import { useRoutes } from 'react-router-dom';

import { routes } from './routing/main';

const Routing: React.FC = () => {
  const element = useRoutes(routes);
  return <>{element}</>;
};

export default Routing;
