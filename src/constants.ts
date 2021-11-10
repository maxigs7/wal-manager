const parseBoolean = (val: string | boolean | number | undefined): boolean => {
  if (!val) return false;
  const s = val && val.toString().toLowerCase().trim();
  if (s == 'true' || s == '1') return true;
  return false;
};

export const AUTH_GOOGLE_ENABLED = parseBoolean(process.env.REACT_APP_AUTH_GOOGLE_ENABLED) || false;
export const AUTH_SIGN_UP_ENABLED =
  parseBoolean(process.env.REACT_APP_AUTH_SIGN_UP_ENABLED) || false;
