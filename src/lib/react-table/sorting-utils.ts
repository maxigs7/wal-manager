export const dateSortType = (dateRowA: Date, dateRowB: Date): number => {
  if (dateRowA > dateRowB) return 1;
  if (dateRowB > dateRowA) return -1;
  return 0;
};
