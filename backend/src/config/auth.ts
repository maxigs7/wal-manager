import { registerAs } from '@nestjs/config';

export interface IGoogleConfig {
  callbackUrl: string;
  clientId: string;
  clientSecret: string;
}

export const authGoogle = registerAs('auth.google', () => ({
  callbackUrl: process.env.GOOGLE_AUTH_CALLBACK_URL || '',
  clientId: process.env.GOOGLE_AUTH_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || '',
}));
