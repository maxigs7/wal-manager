'use client';

import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useColorModeValue,
} from '@chakra-ui/react';

import { ModalOptions } from './types';

type Props = { options?: ModalOptions } & ModalProps;

const ModalContainer: React.FC<Props> = ({ children, options, ...modalProps }) => {
  const bg = useColorModeValue('white', 'primary.900');
  return (
    <Modal {...modalProps} size={options?.size || 'sm'}>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader>{options?.title}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  );
};

export { ModalContainer };
