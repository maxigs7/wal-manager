'use client';

import { PropsWithChildren, useCallback, useRef, useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { createContext } from '@/lib/react/context';

import { ModalContainer } from './modal';
import { CurrentModalType, ModalKey, ModalManagerProps, ModalMap, ModalOptions } from './types';

const [ModalManagerContextProvider, useModalManager] = createContext<ModalManagerProps>({
  name: 'ModalManagerContext',
});

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<ModalMap>(new Map());
  const [currentModal, setCurrentModal] = useState<CurrentModalType | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Component, props, options } = currentModal || {};
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const get = useCallback(
    <TProps,>(key: ModalKey) => {
      return modals.get(key) as React.ComponentType<TProps>;
    },
    [modals],
  );

  const register = useCallback(<TProps,>(key: ModalKey, Component: React.ComponentType<TProps>) => {
    setModals((m) => new Map(m.set(key, Component)));
  }, []);

  const onOpenModal = useCallback(
    <TProps,>(key: ModalKey, options: ModalOptions, props?: TProps) => {
      const modal = get(key);
      if (modal) {
        setCurrentModal({ Component: modal, props, options });
        onOpen();
      }
    },
    [get, onOpen],
  );

  const onCloseModal = useCallback(() => {
    setCurrentModal(null);
    onClose();
  }, [onClose]);

  return (
    <ModalManagerContextProvider
      value={{
        finalRef,
        get,
        initialRef,
        isOpen,
        onClose: onCloseModal,
        onOpen: onOpenModal,
        register,
      }}
    >
      {children}
      <ModalContainer
        finalFocusRef={finalRef}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onCloseModal}
        options={options}
      >
        {Component && <Component {...(props || {})} />}
      </ModalContainer>
    </ModalManagerContextProvider>
  );
};

export { Provider as ModalManagerProvider, useModalManager };
