import React from 'react';

import { ModalCloseButton, ModalHeader, ModalProps } from '@chakra-ui/react';

type Props = Pick<ModalProps, 'onClose'>;

const Header: React.FC<Props> = ({ children, onClose }) => (
  <>
    <ModalHeader>{children}</ModalHeader>
    <ModalCloseButton onClick={onClose} />
  </>
);

export default Header;
