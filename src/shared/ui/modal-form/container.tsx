import React from 'react';

import { Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';

type Props = ModalProps & {
  onSubmit(e?: React.BaseSyntheticEvent): Promise<void>;
};

const Container: React.FC<Props> = ({
  children,
  closeOnOverlayClick = false,
  isOpen = false,
  onSubmit,
  size = '6xl',
  ...props
}) => (
  <Modal closeOnOverlayClick={closeOnOverlayClick} isOpen={isOpen} size={size} {...props}>
    <ModalOverlay />
    <ModalContent as="form" onSubmit={onSubmit}>
      {children}
    </ModalContent>
  </Modal>
);

export default Container;
