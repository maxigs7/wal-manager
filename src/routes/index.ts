import adminRoute from './admin';
import authRoute from './auth';
import movementRoute from './movement';

export const routes = {
  admin: adminRoute,
  auth: authRoute,
  dashboard: '/dashboard',
  movement: movementRoute,
  noAccount: '/no-account',
};

export const PUBLIC_ROUTES = [
  authRoute.resetPassword,
  authRoute.resetPasswordConfirm,
  authRoute.signIn,
  authRoute.signUp,
];
