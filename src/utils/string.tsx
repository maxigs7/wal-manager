/** Utility function to create a K:V from a list of strings */
export function asEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

export function asLiterals<T extends string>(arr: T[]): T[] {
  return arr;
}
