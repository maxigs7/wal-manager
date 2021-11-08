import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useUser } from '@lib/supabase';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth/sign-in',
              state: { from: location },
            }}
          />
        )
      }
    ></Route>
  );
};

export { PrivateRoute };
