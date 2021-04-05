import { Routes } from 'nest-router';
import { AdminModule } from './admin.module';

export const adminRoutes: Routes = [
  {
    path: '/admin',
    module: AdminModule,
  },
];
