'use client';

import React, { PropsWithChildren } from 'react';

import { AlertDialogFooter, Button } from '@chakra-ui/react';

import { es } from '@/i18n';

import { useModalLayout } from './provider';

export type ModalRemoveLayoutProps = PropsWithChildren & {
  cancelLabel?: string;
};

const Footer: React.FC<ModalRemoveLayoutProps> = ({ children, cancelLabel = es.common.cancel }) => {
  const { cancelRef, onClose } = useModalLayout();

  return (
    <AlertDialogFooter>
      {children}
      <Button onClick={onClose} ref={cancelRef}>
        {cancelLabel}
      </Button>
    </AlertDialogFooter>
  );
};

export { Footer };
