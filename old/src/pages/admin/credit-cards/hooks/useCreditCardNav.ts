import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUseCreditCardNavReturn {
  goCreate(): void;
  goIndex(): void;
  goRemove(id: string): void;
  goUpdate(id: string): void;
}

export const useCreditCardNav = (): IUseCreditCardNavReturn => {
  const navigate = useNavigate();
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
