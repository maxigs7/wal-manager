export const parseBoolean = (
  value: string | boolean | undefined,
  defaultValue?: boolean,
): boolean | undefined => {
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  switch (value.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
      return false;
    default:
      return defaultValue;
  }
};

export const parseNumber = (
  value: string | undefined,
  defaultValue?: number,
): number | undefined => {
  if (typeof value === 'undefined') return defaultValue;

  if (isNaN(+value)) {
    throw new Error(`${value} must be a number`);
  }

  return +value;
};
