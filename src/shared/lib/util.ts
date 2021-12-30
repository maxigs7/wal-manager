import * as React from 'react';

import { addMilliseconds, addMonths } from 'date-fns';
import camelcase from 'lodash.camelcase';
import snakecase from 'lodash.snakecase';

const isUndefinedSafe = (obj: any, key: string) =>
  typeof obj[key] === 'undefined' || obj[key] === '';
const isNullSafe = (obj: any, key: string) => obj[key] === null;

export const dateSortType = (dateRowA: Date, dateRowB: Date): number => {
  if (dateRowA > dateRowB) return 1;
  if (dateRowB > dateRowA) return -1;
  return 0;
};

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}

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

export const getRangeFromDate = (date: Date): { endDate: Date; startDate: Date } => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  return {
    endDate: addMilliseconds(addMonths(startDate, 1), -1),
    startDate,
  };
};

export const formatToCurrency = (val: number): string =>
  val.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
