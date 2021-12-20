import { parseISO } from 'date-fns';

import { Transaction, TransactionDto } from '@entities';
import { camelCase } from '@shared';

export const serializer = (data: any[] | null): Transaction[] => {
  if (!data) return [];

  const camelCasedData = camelCase(data);
  return camelCasedData.map(
    (t: any) =>
      ({
        ...t,
        date: parseISO(t.date),
        billedDate: t.billedDate ? parseISO(t.billedDate) : undefined,
      } as Transaction),
  );
};

export const dtoSerializer = (data: any[] | null): TransactionDto[] => {
  if (!data) return [];

  const camelCasedData = camelCase(data);
  return camelCasedData.map(
    (t: any) =>
      ({
        ...t,
        date: parseISO(t.date),
      } as TransactionDto),
  );
};
