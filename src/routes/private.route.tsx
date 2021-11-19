import React from 'react';
import { Navigate } from 'react-router-dom';

import { useUser } from '@lib/supabase';

const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useUser();
  return user ? <>{children}</> : <Navigate to="/auth/sign-in" />;
};

export { PrivateRoute };
