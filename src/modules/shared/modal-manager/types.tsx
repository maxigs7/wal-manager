import { MutableRefObject } from 'react';

import { ModalProps } from '@chakra-ui/react';

export enum ModalKey {
  ACCOUNT_CREATE = 'account-create',
  ACCOUNT_DELETE = 'account-delete',
  ACCOUNT_UPDATE = 'account-update',
  CREDIT_CARD_CREATE = 'credit-card-create',
  CREDIT_CARD_DELETE = 'credit-card-delete',
  CREDIT_CARD_UPDATE = 'credit-card-update',
}

export type ModalOptions = {
  size?: ModalProps['size'];
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
  get<TProps>(key: ModalKey): React.ComponentType<TProps>;
  initialRef: MutableRefObject<any>;
  isOpen: boolean;
  onOpen<TProps>(key: ModalKey, options: ModalOptions, props?: TProps): void;
  onClose(): void;
  register<TProps>(key: ModalKey, Component: React.ComponentType<TProps>): void;
};
