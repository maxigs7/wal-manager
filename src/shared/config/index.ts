const getEnvVar = (key: string, isRequired = false, isReact = true) => {
  const fullKey = `${isReact ? 'REACT_APP_' : ''}${key}`;
  if (process.env[fullKey] === undefined && isRequired) {
    throw new Error(`Env variable ${fullKey} is required`);
  }
  return process.env[fullKey] || '';
};

const parseBoolean = (val: string | boolean | number | undefined): boolean => {
  if (!val) return false;
  const s = val && val.toString().toLowerCase().trim();
  if (s == 'true' || s == '1') return true;
  return false;
};

export const AUTH_GOOGLE_ENABLED = parseBoolean(getEnvVar('AUTH_GOOGLE_ENABLED'));
export const AUTH_SIGN_UP_ENABLED = parseBoolean(getEnvVar('AUTH_SIGN_UP_ENABLED'));
export const NODE_ENV = getEnvVar('NODE_ENV', true, false);
export const SUPABASE_ANON_KEY = getEnvVar('SUPABASE_ANON_KEY', true);
export const SUPABASE_URL = getEnvVar('SUPABASE_API_URL', true);
export const IS_RECURRING_ENABLED = parseBoolean(getEnvVar('IS_RECURRING_ENABLED'));

export const isDevEnv = NODE_ENV === 'development';
export const isProdEnv = NODE_ENV === 'production';
