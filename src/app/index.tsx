import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { mainRoutes } from '@routes';
import { PageLoader } from '@shared';

import { withProviders } from './hocs';

const App: React.FC = withProviders(() => {
  const element = useRoutes(mainRoutes);
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
});

export default App;
