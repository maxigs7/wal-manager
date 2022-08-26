import { dateSortType, getRangeFromDate } from '../';

describe('date-fns utils', () => {
  describe('dateSortType', () => {
    it('equals date should return 0', () => {
      const date1 = new Date();
      const date2 = date1;
      const result = dateSortType(date1, date2);
      expect(result).toBe(0);
    });

    it('when date1 is greater than date2 should return 1', () => {
      const date1 = new Date();
      const date2 = new Date();
      date2.setFullYear(date2.getFullYear() - 1);
      const result = dateSortType(date1, date2);
      expect(result).toBe(1);
    });

    it('when date2 is greater than date1 should return -1', () => {
      const date1 = new Date();
      const date2 = new Date();
      date1.setFullYear(date1.getFullYear() - 1);
      const result = dateSortType(date1, date2);
      expect(result).toBe(-1);
    });
  });

  describe('getRangeFromDate', () => {
    it('given a date should return first day of month and last day of month', () => {
      const date = new Date(2022, 0, 15);
      const result = getRangeFromDate(date);
      expect(result.startDate.getDate()).toBe(1);
      expect(result.startDate.getMonth()).toBe(0);
      expect(result.endDate.getDate()).toBe(31);
      expect(result.endDate.getMonth()).toBe(0);
    });
  });
});
