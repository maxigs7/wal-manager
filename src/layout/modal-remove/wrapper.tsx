'use client';

import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useCallback, useRef } from 'react';

import {
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import { LayoutProvider } from './provider';

export type WrapperProps = PropsWithChildren & {
  title: string;
};

const Wrapper: React.FC<WrapperProps> = ({ children, title }) => {
  const router = useRouter();
  const cancelRef = useRef(null);

  const onCloseHandler = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <LayoutProvider cancelRef={cancelRef}>
      <AlertDialog isOpen={true} leastDestructiveRef={cancelRef} onClose={onCloseHandler}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            {children}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </LayoutProvider>
  );
};

export { Wrapper };
