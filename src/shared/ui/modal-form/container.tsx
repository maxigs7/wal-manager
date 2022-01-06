import React from 'react';

import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalProps,
  useBreakpointValue,
} from '@chakra-ui/react';

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
}) => {
  const responsiveSize = useBreakpointValue({ base: 'full', md: size });
  return (
    <Modal
      closeOnOverlayClick={closeOnOverlayClick}
      isOpen={isOpen}
      size={responsiveSize}
      {...props}
    >
      <ModalOverlay />
      <ModalContent as="form" onSubmit={onSubmit} rounded={{ base: 'none', md: 'md' }}>
        {children}
      </ModalContent>
    </Modal>
  );
};

export default Container;
