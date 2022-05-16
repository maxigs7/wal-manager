import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useUser } from '../../providers';

const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  // Redirect them to the /sign-in page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return user ? <>{children}</> : <Navigate state={{ from: location }} to="/auth/sign-in" />;
};

export default PrivateRoute;
