import adminRoute from './admin';
import movementRoute from './movement';

export const routes = {
  admin: adminRoute,
  dashboard: '/dashboard',
  movement: movementRoute,
  noAccount: '/no-account',
};
