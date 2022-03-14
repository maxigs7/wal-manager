import { useMemo } from 'react';

import { useRouter } from '@lib';

interface IUseCreditCardNavReturn {
  goCreate(): void;
  goIndex(): void;
  goRemove(id: string): void;
  goUpdate(id: string): void;
}

export const useCreditCardNav = (): IUseCreditCardNavReturn => {
  const { navigate } = useRouter();
  return useMemo(
    () => ({
      goCreate: () => navigate('/admin/credit-cards/create'),
      goIndex: () => navigate('/admin/credit-cards'),
      goRemove: (id: string) => navigate(`/admin/credit-cards/remove/${id}`),
      goUpdate: (id: string) => navigate(`/admin/credit-cards/update/${id}`),
    }),
    [navigate],
  );
};
