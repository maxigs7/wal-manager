import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react';

import { useUser } from '../../providers';

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, initializing } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function handleRouteChange() {
      if (!(user || initializing)) {
        await router.push('/auth/sign-in');
      }
    }

    handleRouteChange();
  }, [user, initializing, router]);

  // Redirect them to the /sign-in page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return <>{children}</>;
};

export default PrivateRoute;
