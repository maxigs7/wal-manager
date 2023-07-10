import accountsRoute from './accounts';
import authRoute from './auth';
import movementRoute from './movement';
import settingsRoute from './settings';

export const routes = {
  accounts: accountsRoute,
  auth: authRoute,
  dashboard: '/dashboard',
  movement: movementRoute,
  noAccount: '/no-account',
  settings: settingsRoute,
};

export const PUBLIC_ROUTES = [
  '/components',
  authRoute.resetPassword,
  authRoute.resetPasswordConfirm,
  authRoute.signIn,
  authRoute.signUp,
];
