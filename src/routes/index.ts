import adminRoute from './admin';
import authRoute from './auth';
import movementRoute from './movement';
import settingsRoute from './settings';

export const routes = {
  admin: adminRoute,
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
