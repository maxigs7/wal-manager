export type Currency = 'ars' | 'usd';
export const DEFAULT_CURRENCY: Currency = 'ars';
export const getCurrencyName = (currency: Currency): string => {
  return currency.toUpperCase();
};
