import { registerAs } from '@nestjs/config';

export interface IAppConfig {
  env: string;
  port: number;
}

export type Environment = 'development' | 'test' | 'production';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
}));
