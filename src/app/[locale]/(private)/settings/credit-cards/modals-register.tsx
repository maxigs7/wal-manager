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
      ModalKey.CREDIT_CARD_CREATE,
      dynamic(() => import('@/m/credit-cards/credit-card-create/modal'), {
        loading: () => <ContentLoader />,
      }),
    );
    register(
      ModalKey.CREDIT_CARD_DELETE,
      dynamic(() => import('@/m/credit-cards/credit-card-delete'), {
        loading: () => <ContentLoader />,
      }),
    );
    register(
      ModalKey.CREDIT_CARD_UPDATE,
      dynamic(() => import('@/m/credit-cards/credit-card-update/modal'), {
        loading: () => <ContentLoader />,
      }),
    );
  }, [register]);

  return null;
};
