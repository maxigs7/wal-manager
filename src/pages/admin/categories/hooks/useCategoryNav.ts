import { useMemo } from 'react';

import { CategoryType } from '@entities';
import { useRouter } from '@shared';

interface IUseCategoryNavReturn {
  goCreate(type: CategoryType): void;
  goIndex(type: CategoryType): void;
  goRemove(type: CategoryType, id: string): void;
  goSubCreate(type: CategoryType, parentId: string): void;
  goSubRemove(type: CategoryType, parentId: string, id: string): void;
  goSubUpdate(type: CategoryType, parentId: string, id: string): void;
  goUpdate(type: CategoryType, id: string): void;
}

export const useCategoryNav = (): IUseCategoryNavReturn => {
  const { navigate } = useRouter();
  return useMemo(
    () => ({
      goCreate: (type: CategoryType) => navigate(`/admin/categories/${type}/create`),
      goIndex: (type: CategoryType) => navigate(`/admin/categories/${type}`),
      goRemove: (type: CategoryType, id: string) =>
        navigate(`/admin/categories/${type}/remove/${id}`),
      goSubCreate: (type: CategoryType, parentId: string) =>
        navigate(`/admin/categories/${type}/${parentId}/create`),
      goSubRemove: (type: CategoryType, parentId: string, id: string) =>
        navigate(`/admin/categories/${type}/${parentId}/remove/${id}`),
      goSubUpdate: (type: CategoryType, parentId: string, id: string) =>
        navigate(`/admin/categories/${type}/${parentId}/update/${id}`),
      goUpdate: (type: CategoryType, id: string) =>
        navigate(`/admin/categories/${type}/update/${id}`),
    }),
    [navigate],
  );
};
