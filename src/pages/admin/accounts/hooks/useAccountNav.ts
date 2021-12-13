import { useMemo } from 'react';

import { useRouter } from '@shared';

interface IUseAccountNavReturn {
  goCreate(): void;
  goIndex(): void;
  goRemove(id: string): void;
  goUpdate(id: string): void;
}

export const useAccountNav = (): IUseAccountNavReturn => {
  const { navigate } = useRouter();
  return useMemo(
    () => ({
      goCreate: () => navigate('/admin/accounts/create'),
      goIndex: () => navigate('/admin/accounts'),
      goRemove: (id: string) => navigate(`/admin/accounts/remove/${id}`),
      goUpdate: (id: string) => navigate(`/admin/accounts/update/${id}`),
    }),
    [navigate],
  );
};
