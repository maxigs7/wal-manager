import camelcase from 'lodash.camelcase';
import snakecase from 'lodash.snakecase';

const types = new Map([
  ['ACCOUNT', 'account'],
  ['CATEGORY', 'category'],
  ['CREDIT_CARD', 'credit_card'],
  ['TRANSACTION', 'transaction'],
]);

export const getTableName = (key: string): string => {
  if (types.has(key)) return types.get(key) as string;
  throw new Error('WRONG KEY');
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const camelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelCase(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelcase(key)]: camelCase(obj[key]),
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
        [snakecase(key)]: snakeCase(obj[key]),
      }),
      {},
    );
  }
  return obj;
};
