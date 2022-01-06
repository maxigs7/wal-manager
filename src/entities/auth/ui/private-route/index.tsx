import React from 'react';
import { Navigate } from 'react-router-dom';

import { useRouter } from '@shared';

import { useUser } from '../../hooks';

const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useUser();
  const { location } = useRouter();

  // Redirect them to the /sign-in page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return user ? <>{children}</> : <Navigate state={{ from: location }} to="/auth/sign-in" />;
};

export default PrivateRoute;
