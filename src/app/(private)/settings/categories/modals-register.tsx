'use client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { ContentLoader } from '@/m/shared/loaders/content-loader';
import { useModalManager } from '@/m/shared/modal-manager/provider';
import { ModalKey } from '@/m/shared/modal-manager/types';

export const ModalsRegister: React.FC = () => {
  const { register } = useModalManager();

  useEffect(() => {
    register(
      ModalKey.CATEGORY_CREATE,
      dynamic(() => import('@/m/categories/category-create/modal'), {
        loading: () => <ContentLoader />,
      }),
    );
    register(
      ModalKey.CATEGORY_DELETE,
      dynamic(() => import('@/m/categories/category-delete'), { loading: () => <ContentLoader /> }),
    );
    register(
      ModalKey.CATEGORY_UPDATE,
      dynamic(() => import('@/m/categories/category-update/modal'), {
        loading: () => <ContentLoader />,
      }),
    );
    register(
      ModalKey.SUBCATEGORY_CREATE,
      dynamic(() => import('@/m/categories/subcategory-create/modal'), {
        loading: () => <ContentLoader />,
      }),
    );
    register(
      ModalKey.SUBCATEGORY_UPDATE,
      dynamic(() => import('@/m/categories/subcategory-update/modal'), {
        loading: () => <ContentLoader />,
      }),
    );
  }, [register]);

  return null;
};
