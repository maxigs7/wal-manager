import { parseBoolean } from './parsers';

// CHECK REQUIRED
if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error(`Env variable VITE_SUPABASE_ANON_KEY is required`);
}
if (!import.meta.env.VITE_SUPABASE_API_URL) {
  throw new Error(`Env variable VITE_SUPABASE_API_URL is required`);
}

export const AUTH_GOOGLE_ENABLED = parseBoolean(import.meta.env.VITE_AUTH_GOOGLE_ENABLED, false);
export const AUTH_SIGN_UP_ENABLED = parseBoolean(import.meta.env.VITE_AUTH_SIGN_UP_ENABLED, false);
export const IS_RECURRING_ENABLED = parseBoolean(import.meta.env.VITE_IS_RECURRING_ENABLED, false);
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const SUPABASE_API_URL = import.meta.env.VITE_SUPABASE_API_URL;
