import camelcase from 'lodash.camelcase';
import snakecase from 'lodash.snakecase';

const isUndefinedSafe = (obj: any, key: string) =>
  typeof obj[key] === 'undefined' || obj[key] === '';
const isNullSafe = (obj: any, key: string) => obj[key] === null;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const camelCase = (obj: any, cleanNull = true): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelCase(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelcase(key)]: cleanNull && isNullSafe(obj, key) ? undefined : camelCase(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const snakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => snakeCase(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakecase(key)]: isUndefinedSafe(obj, key) ? null : snakeCase(obj[key]),
      }),
      {},
    );
  }
  return obj;
};
