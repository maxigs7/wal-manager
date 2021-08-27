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

import { Icon } from '@lib/chakra-ui';

const DeleteDialog: React.FC<IProps> = ({ isLoading, isOpen, onClose, onConfirm, title }) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>Estas seguro? Esta accion no se puede deshacer.</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              colorScheme="crimson"
              isLoading={isLoading}
              leftIcon={<Icon icon="trash-alt" />}
              mr={3}
              onClick={onConfirm}
            >
              Delete
            </Button>
            <Button onClick={onClose} ref={cancelRef}>
              Cancel
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

export { DeleteDialog };
