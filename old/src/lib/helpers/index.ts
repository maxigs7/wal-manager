const isUndefinedSafe = (obj: any, key: string) =>
  typeof obj[key] === 'undefined' || obj[key] === '';
const isNullSafe = (obj: any, key: string) => obj[key] === null;

export const cleanFromServer = (obj: any, cleanNull = true): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => cleanFromServer(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [key]: cleanNull && isNullSafe(obj, key) ? undefined : cleanFromServer(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

export const cleanToServer = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => cleanToServer(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [key]: isUndefinedSafe(obj, key) ? null : cleanToServer(obj[key]),
      }),
      {},
    );
  }
  return obj;
};
