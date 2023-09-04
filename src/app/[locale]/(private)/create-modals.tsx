'use client';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import { modalCreator } from '@/m/shared/modal-manager/modal-creator';
import { ModalStoreProvider } from '@/m/shared/modal-manager/modal-store';

modalCreator(
  'ACCOUNT_CREATE_MODAL',
  dynamic(() => import('@/m/accounts/account-create/modal'), {
    loading: () => <>loading...</>,
  }),
);

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ModalStoreProvider>{children}</ModalStoreProvider>;
};
