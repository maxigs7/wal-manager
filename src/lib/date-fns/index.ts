import { addMilliseconds, addMonths } from 'date-fns';

export const dateSortType = (dateRowA: Date, dateRowB: Date): number => {
  if (dateRowA > dateRowB) return 1;
  if (dateRowB > dateRowA) return -1;
  return 0;
};

export const getRangeFromDate = (date: Date): { endDate: Date; startDate: Date } => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  return {
    endDate: addMilliseconds(addMonths(startDate, 1), -1),
    startDate,
  };
};
