import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from '@lib/auth';
import { PageLoader } from '@lib/wal-ui';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
  const { user, initializing } = useAuth();
  if (initializing) {
    return <PageLoader />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: location },
            }}
          />
        )
      }
    ></Route>
  );
};

export { PrivateRoute };
