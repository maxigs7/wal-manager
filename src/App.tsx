import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { useUser } from '@lib/supabase';
import { PageLoader } from '@lib/wal-ui';
import { adminRoutes, defaultRoutes } from '@routes';

const AuthWrapper: React.FC = ({ children }) => {
  const { initializing } = useUser();

  if (initializing) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const element = useRoutes([...defaultRoutes, ...adminRoutes]);
  return (
    <AuthWrapper>
      <Suspense fallback={<PageLoader />}>{element}</Suspense>
    </AuthWrapper>
  );
};

export default App;
