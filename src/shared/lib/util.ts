import * as React from 'react';

import camelcase from 'lodash.camelcase';
import snakecase from 'lodash.snakecase';

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
