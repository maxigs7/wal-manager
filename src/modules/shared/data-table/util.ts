export const DEFAULT_PAGE_SIZE = 10;
export const pageIndexes = [-2, -1, 0, 1, 2];
export const pageSizes = [10, 20, 50, 75, 100] as const;
export type PageSizeType = (typeof pageSizes)[number];
