import { ApiModule } from './api.module';
import { adminRoutes } from './admin/admin.routes';

export const apiRoutes = [
  {
    path: '/api',
    module: ApiModule,
    children: [...adminRoutes],
  },
];
