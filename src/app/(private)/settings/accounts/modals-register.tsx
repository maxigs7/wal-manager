'use client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { useModalManager } from '@/m/shared/modal-manager/provider';
import { ContentLoader } from '@/modules/shared/loaders/content-loader';
import { ModalKey } from '@/modules/shared/modal-manager/types';

export const ModalsRegister: React.FC = () => {
  const { register } = useModalManager();

  useEffect(() => {
    register(
      ModalKey.ACCOUNT_CREATE,
      dynamic(() => import('@/m/accounts/account-create/modal'), {
        loading: () => <ContentLoader />,
      }),
    );
    register(
      ModalKey.ACCOUNT_DELETE,
      dynamic(() => import('@/m/accounts/account-delete'), { loading: () => <ContentLoader /> }),
    );
    register(
      ModalKey.ACCOUNT_UPDATE,
      dynamic(() => import('@/m/accounts/account-update/modal'), {
        loading: () => <ContentLoader />,
      }),
    );
  }, [register]);

  return null;
};
