import { useMemo } from 'react';

import { TransactionType } from '@entities';
import { useRouter } from '@shared';

interface IUseTransactionNavReturn {
  goCreate(type: TransactionType, date: Date): void;
  goIndex(): void;
  goRemove(id: string): void;
  goUpdate(id: string): void;
}

export const useTransactionNav = (): IUseTransactionNavReturn => {
  const { navigate } = useRouter();
  return useMemo(
    () => ({
      goCreate: (type: TransactionType, date: Date) =>
        navigate(`/transactions/${type}/create`, { state: { defaultDate: date } }),
      goIndex: () => navigate('/transactions'),
      goRemove: (id: string) => navigate(`/transactions/remove/${id}`),
      goUpdate: (id: string) => navigate(`/transactions/update/${id}`),
    }),
    [navigate],
  );
};
