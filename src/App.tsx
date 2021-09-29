import React, { Suspense } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

import { LazyAdminLayout, LazyDefaultLayout } from '@app/layouts';
import { PageLoader } from '@lib/wal-ui';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { SET_INITIALIZED, SET_USER } from './stores/auth/actions';
import { IUser } from './stores/auth/state';

const AuthWrapper: React.FC = ({ children }) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const dispatch = useAppDispatch();
  const initialized = useAppSelector((state) => state.auth.initialized);
  if (!children || status === 'error') {
    throw new Error('ERROR');
  }

  if (status === 'loading') {
    return <PageLoader />;
  }

  if (!initialized) {
    dispatch(SET_INITIALIZED(true));
    if (signInCheckResult.signedIn) {
      dispatch(SET_USER(signInCheckResult.user.toJSON() as IUser));
    }
  }

  return <>{children}</>;
};

const App: React.FC = () => (
  <AuthWrapper>
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route component={LazyDefaultLayout} path="/auth" />
        <Route component={LazyAdminLayout} path="/" />
      </Switch>
    </Suspense>
  </AuthWrapper>
);

export default App;
