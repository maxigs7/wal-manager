import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAppSelector } from '@app/hooks/redux';
import { selectUser } from '@app/stores/auth';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
  const user = useAppSelector(selectUser);

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
