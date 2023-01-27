import React, { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

import { es } from '@/i18n';

import { Icon } from '../icon';


const DialogRemove: React.FC<IProps> = ({ isLoading, isOpen, onClose, onConfirm, title }) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{es.common.dialog.removeWarning}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              colorScheme="danger"
              isLoading={isLoading}
              leftIcon={<Icon icon="trash-alt" />}
              mr={3}
              onClick={onConfirm}
            >
              {es.common.remove}
            </Button>
            <Button onClick={onClose} ref={cancelRef}>
              {es.common.cancel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

interface IProps {
  isLoading: boolean;
  isOpen: boolean;
  onClose(): void;
  onConfirm(): void;
  title: string;
}

export { DialogRemove };
