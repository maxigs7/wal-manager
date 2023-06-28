'use client';

import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

import { ModalOptions } from './types';

type Props = { options?: ModalOptions } & ModalProps;

const ModalContainer: React.FC<Props> = ({ children, options, ...modalProps }) => (
  <Modal {...modalProps}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{options?.title}</ModalHeader>
      <ModalCloseButton />
      {children}
    </ModalContent>
  </Modal>
);

export { ModalContainer };
