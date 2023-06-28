import dynamic from 'next/dynamic';
import { MutableRefObject } from 'react';

import { ContentLoader } from '../loaders/content-loader';

export enum ModalKey {
  ACCOUNT_DELETE = 'account-delete',
  CREDIT_CARD_DELETE = 'credit-card-delete',
}

export type ModalOptions = {
  title: string;
};

export type CurrentModalType = {
  Component: React.ComponentType<any>;
  options: ModalOptions;
  props?: any;
};

export type ModalMap = Map<ModalKey, React.ComponentType<any>>;

export type ModalManagerProps = {
  finalRef: MutableRefObject<any>;
  get(key: ModalKey): any;
  initialRef: MutableRefObject<any>;
  isOpen: boolean;
  onOpen<TProps>(key: ModalKey, options: ModalOptions, props?: TProps): void;
  onClose(): void;
};

export const ModalRegistered = new Map<ModalKey, React.ComponentType<any>>([
  [
    ModalKey.ACCOUNT_DELETE,
    dynamic(() => import('@/m/accounts/account-delete'), { loading: () => <ContentLoader /> }),
  ],
  [
    ModalKey.CREDIT_CARD_DELETE,
    dynamic(() => import('@/m/credit-cards/credit-card-delete'), {
      loading: () => <ContentLoader />,
    }),
  ],
]);
