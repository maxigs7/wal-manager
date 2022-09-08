import { parseBoolean } from './parsers';

const REQUIRED_ENV = [
  'NEXT_PUBLIC_BASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_API_URL',
];
// CHECK REQUIRED
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error(`Env variable NEXT_PUBLIC_BASE_URL is required`);
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(`Env variable NEXT_PUBLIC_SUPABASE_ANON_KEY is required`);
}
if (!process.env.NEXT_PUBLIC_SUPABASE_API_URL) {
  throw new Error(`Env variable NEXT_PUBLIC_SUPABASE_API_URL is required`);
}

// REQUIRED
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const SUPABASE_API_URL = process.env.NEXT_PUBLIC_SUPABASE_API_URL;

// OPTIONALS
export const AUTH_GOOGLE_ENABLED = parseBoolean(process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED, false);
export const AUTH_SIGN_UP_ENABLED = parseBoolean(
  process.env.NEXT_PUBLIC_AUTH_SIGN_UP_ENABLED,
  false,
);
export const IS_RECURRING_ENABLED = parseBoolean(
  process.env.NEXT_PUBLIC_IS_RECURRING_ENABLED,
  false,
);
