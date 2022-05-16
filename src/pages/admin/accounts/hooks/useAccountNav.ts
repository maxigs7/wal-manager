import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUseAccountNavReturn {
  goCreate(): void;
  goIndex(): void;
  goRemove(id: string): void;
  goUpdate(id: string): void;
}

export const useAccountNav = (): IUseAccountNavReturn => {
  const navigate = useNavigate();
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
