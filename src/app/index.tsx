import React, { Suspense } from 'react';

import Routing from '@pages';
import { PageLoader } from '@shared';

import { withProviders } from './hocs';

const App: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routing />
    </Suspense>
  );
};

export default withProviders(App);
