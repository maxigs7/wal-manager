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
            <Button onClick={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button colorScheme="crimson" isLoading={isLoading} ml={3} onClick={onConfirm}>
              Delete
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
