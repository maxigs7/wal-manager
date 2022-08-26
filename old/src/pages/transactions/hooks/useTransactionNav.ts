import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TransactionType } from '@models';

interface IUseTransactionNavReturn {
  goClone(id: string): void;
  goCreate(type: TransactionType, date: Date): void;
  goIndex(): void;
  goRemove(id: string): void;
  goUpdate(id: string, date: Date): void;
}

export const useTransactionNav = (): IUseTransactionNavReturn => {
  const navigate = useNavigate();
  return useMemo(
    () => ({
      goClone: (id: string) => navigate(`/transactions/clone/${id}`),
      goCreate: (type: TransactionType, date: Date) =>
        navigate(`/transactions/${type}/create`, { state: { defaultDate: date } }),
      goIndex: () => navigate('/transactions'),
      goRemove: (id: string) => navigate(`/transactions/remove/${id}`),
      goUpdate: (id: string, date: Date) =>
        navigate(`/transactions/update/${id}`, { state: { defaultDate: date } }),
    }),
    [navigate],
  );
};
