import { registerAs } from '@nestjs/config';

export interface IAppConfig {
  env: string;
  port: number;
  secret: string;
  /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
  expiresIn: string | number;
}

export type Environment = 'development' | 'test' | 'production';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.JWT_APP_SECRET || '',
  expiresIn: process.env.JWT_EXPIRATION_TIME || 3600,
}));
