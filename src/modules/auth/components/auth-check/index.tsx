import { PropsWithChildren } from 'react';

import { PageLoader } from '@/shared';

import { useUser } from '../../providers';

const AuthCheck: React.FC<PropsWithChildren> = ({ children }) => {
  const { initializing } = useUser();
  if (initializing) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export { AuthCheck };
