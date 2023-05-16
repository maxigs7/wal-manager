'use client';

import React, { PropsWithChildren, useCallback } from 'react';

import { Button, Icon } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/24/outline';

type Props = PropsWithChildren & {
  isLoading?: boolean;
  onConfirm?(): void;
};

const ConfirmButton: React.FC<Props> = ({ children, isLoading = false, onConfirm }) => {
  const onConfirmHandler = useCallback(() => {
    onConfirm && onConfirm();
  }, [onConfirm]);

  return (
    <Button
      colorScheme="danger"
      isLoading={isLoading}
      leftIcon={<Icon as={TrashIcon} />}
      mr={3}
      onClick={onConfirmHandler}
    >
      {children}
    </Button>
  );
};

export { ConfirmButton };
