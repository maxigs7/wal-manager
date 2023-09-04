'use client';

import { PropsWithChildren, useCallback, useState } from 'react';

import { DialogProps } from '@mui/material/Dialog';

import { createContext } from '@/lib/react/context';

import { ModalContainer } from './modal';
import { MODALS, modalGetter } from './modal-creator';
import { CurrentModalType, ModalMap, ModalOptions } from './types';

type ModalStoreContextProps = {
  isOpen: boolean;
  onOpen<TProps>(key: string, options: ModalOptions, props?: TProps): void;
  onClose(): void;
};

const [ModalStoreContextProvider, useModalStore] = createContext<ModalStoreContextProps>({
  name: 'ModalStoreContext',
});

const ModalStoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [_internalModals] = useState<ModalMap>(MODALS);
  const [currentModal, setCurrentModal] = useState<CurrentModalType | null>(null);
  const [isOpen, setOpen] = useState(false);

  const { Component, props, options } = currentModal || {};

  const onOpenModal = useCallback(
    <TProps,>(key: string, options: ModalOptions, props?: TProps) => {
      const modal = modalGetter<TProps>(_internalModals, key);
      if (modal) {
        setCurrentModal({ Component: modal, props, options });
        setOpen(true);
      }
    },
    [_internalModals],
  );

  const onCloseModal = useCallback(() => {
    setCurrentModal(null);
    setOpen(false);
  }, []);

  const onCloseWrapper = useCallback((e: any, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && !options?.closeOnBackdropClick) return;

    onCloseModal();
  }, []);

  return (
    <ModalStoreContextProvider
      value={{
        isOpen,
        onClose: onCloseModal,
        onOpen: onOpenModal,
      }}
    >
      {children}
      <ModalContainer onClose={onCloseWrapper} open={isOpen} options={options}>
        {Component && <Component {...(props || {})} />}
      </ModalContainer>
    </ModalStoreContextProvider>
  );
};

export { ModalStoreProvider, useModalStore };
