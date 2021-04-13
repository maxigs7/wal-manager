import { Routes } from 'nest-router';
import { AuthModule } from './auth.module';

export const authRoutes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
];
