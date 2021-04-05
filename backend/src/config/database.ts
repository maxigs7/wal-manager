import { registerAs } from '@nestjs/config';

export interface IDatabaseConfig {
  url: string;
  name: string;
  user: string;
  password: string;
}

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
}));
